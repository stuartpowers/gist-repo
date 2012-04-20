#
# $> ruby load.rb http://data.githubarchive.org/2012-04-01-15.json.gz
#

require 'yajl'
require 'zlib'
require 'sqlite3'
require 'open-uri'

input = ARGV.shift

# create the SQLite table schema
@schema = open('https://raw.github.com/igrigorik/githubarchive.org/master/bigquery/schema.js')
@schema = Yajl::Parser.parse(@schema.read)
@keys = @schema.map {|r| r['name']}

# map GitHub JSON schema to flat CSV space based
# on provided Big Query column schema
def flatmap(h, e, prefix = '')
  e.each do |k,v|      
    if v.is_a?(Hash)
      flatmap(h, v, prefix+k+"_")
    else
      key = prefix+k
      next if !@keys.include? key
      
      case v
      when TrueClass then h[key] = 1
      when FalseClass then h[key] = 0
      else
        next if v.nil?
        h[key] = v unless v.is_a? Array
      end
    end
  end
  h
end

# Create table schema
create_table = "create table if not exists events ( \n"
@schema.each do |column|
  create_table += case column['type']
  when 'INTEGER', 'BOOLEAN'
    "#{column['name']} integer, \n"
  when 'STRING'
    "#{column['name']} text, \n"
  end
end
create_table = create_table.chomp(", \n") + ");"

# load the data
db = SQLite3::Database.open("github.sqlite")
db.execute(create_table)

gz = open(input)
js = Zlib::GzipReader.new(gz).read
Yajl::Parser.parse(js) do |event|
  row = flatmap({}, event)
  keys, values = row.keys, row.values
  
  db.execute "INSERT INTO events(#{keys.join(',')}) VALUES (#{(['?'] * keys.size).join(',')})", *values  
end

# Run a query...
p db.execute("select count(*) from events")