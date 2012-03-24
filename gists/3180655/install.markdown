# New Machine

Here's what I do after I do a fresh install of Lion. Things are sorta grouped by type.

### General Config

1. Run Software Update
2. Start downloading [Xcode](http://developer.apple.com/ios)
3. Disable auto-bright and turn brightness all the way up
4. Enable mouse right click
5. Turn up mouse & trackpad tracking
6. Control-F7 to enable better tabbing
7. Disable energy saver dimming and up sleep times
8. Clean up dock
9. Setup Time Machine with Time Capsule
10. Clean up menu bar. Remove Bluetooth, Sound, and Time Machine.
11. Turn on auto-hiding dock and magnification
12. Change default Finder sorting to sort by name
13. Snap desktop items to grid
14. Disable Dashboard as a space

### Install Apps

1. Download apps from the App Store Purchases tab that I commonly use. Here's the main ones:
    * [Aperture](http://itunes.apple.com/us/app/aperture/id408981426?mt=12)
    * [Final Cut Pro](http://itunes.apple.com/us/app/final-cut-pro/id424389933?mt=12)
    * [Compressor](http://itunes.apple.com/us/app/compressor/id424390742?mt=12)
    * [Pages](http://itunes.apple.com/us/app/pages/id409201541?mt=12)
    * [Numbers](http://itunes.apple.com/us/app/numbers/id409203825?mt=12)
    * [Wallet](http://itunes.apple.com/us/app/wallet/id404234608?mt=12)
    * [Cloud](http://itunes.apple.com/us/app/cloud/id417602904?mt=12)
    * [CoverSutra](http://itunes.apple.com/us/app/coversutra/id404128139?mt=12)
    * [Twitter](http://itunes.apple.com/us/app/twitter/id409789998?mt=12)
2. [Install Growl](http://growl.info/downloads) and set to start at login
3. [Install Rogie HUD Growl Theme](http://www.komodomedia.com/download/#hud-growl-theme) and set as default
4. [Install Dropbox](https://www.dropbox.com/downloading?os=mac) and change menu bar color in preferences
5. Change Spotlight shortcut to Option-Space
6. [Install Alfred](http://www.alfredapp.com/) and change shortcut to Command-Space
7. [Install xScope](http://iconfactory.com/software/xscope)
8. [Install GitHub for Mac](http://mac.github.com/)
9. Install Adobe apps
10. [Install Flash](http://get.adobe.com/flashplayer/?promoid=BUIGP) (as much I wish I didn't have to)
11. Setup iChat
12. Setup Mail

### Install Unix Stuff

1. Create and own /usr/local

        $ sudo mkdir /usr/local
        $ sudo chown -R $USER /usr/local
        $ sudo chmod -R 775 /usr/local

2. Create `/usr/local/bin`

        $ mkdir /usr/local/bin

3. [Download TextMate](http://macromates.com) and setup `mate` command
4. Install Xcode
5. Change Terminal to Monaco 12
6. Install Homebrew

        $ /usr/bin/ruby -e "$(/usr/bin/curl -fksSL https://raw.github.com/mxcl/homebrew/master/Library/Contributions/install_homebrew.rb)"

7. Install Git

        $ brew install git

8. Install [my dotfiles](http://github.com/samsoffes/dotfiles) and use zsh

        $ chsh -s /bin/zsh
        $ cd ~
        $ git init
        $ git remote add origin http://github.com/samsoffes/dotfiles.git
        $ git pull origin master
        $ SetFile -a "V" ~/Readme.markdown

9. Edit `~/.gitconfig` and change my name and email to yours.
10. Ignore everything in home (add a `*` line to the `~/.git/info/exclude` file)
11. [Install kdiff3](http://sourceforge.net/projects/kdiff3/files/). After copying it to your `/Applications` folder, symlink it:

        $ cd /usr/local/bin
        $ ln -s /Applications/kdiff3.app/Contents/MacOS/kdiff3

12. Install [my scripts](https://github.com/samsoffes/bin)

        $ git clone https://github.com/samsoffes/bin.git ~/bin

### Install TextMate Plugins

1. Install [MissingDrawer plugin](https://github.com/jezdez/textmate-missingdrawer)

        $ curl -L https://github.com/downloads/jezdez/textmate-missingdrawer/MissingDrawer-0.4.0.tmplugin.zip | tar -xf - && open MissingDrawer.tmplugin

2. Install [SASS bundle](https://github.com/fluxsaas/sass-textmate-bundle)

        $ git clone https://github.com/fluxsaas/sass-textmate-bundle.git "Ruby-Saas-Alternative-Syntax.tmbundle"
        $ open Ruby-Saas-Alternative-Syntax.tmbundle

3. Install [SCSS bundle](https://github.com/kuroir/SCSS.tmbundle)

        $ git clone https://github.com/kuroir/SCSS.tmbundle.git
        $ open SCSS.tmbundle

4. Install [Railscasts themes](https://github.com/ryanb/textmate-themes)

        $ git clone https://github.com/ryanb/textmate-themes.git
        $ open textmate-themes/railscasts.tmTheme
        $ open textmate-themes/ryan-light.tmTheme
        $ rm -rf textmate-themes

### Install Ruby Environment

1. [Install rbenv](https://github.com/sstephenson/rbenv#section_2) and [ruby-build](https://github.com/sstephenson/ruby-build):

        $ brew install ruby-build
        $ brew install rbenv
        # Restart shell
        $ rbenv install 1.9.3-p125
        $ rbenv rehash
        $ rbenv global 1.9.3-p125

2. Install [Bundler](http://gembundler.com/)

        # Restart your shell before running
        $ gem install bundler --pre
        $ rbenv rehash

3. Install [PostgreSQL](http://www.postgresql.org/)

        $ brew install postgresql
        $ initdb /usr/local/var/postgres
        # Note: The following command contains the version. You may need to change this depending on what installed.
        $ cp /usr/local/Cellar/postgresql/9.0.4/org.postgresql.postgres.plist ~/Library/LaunchAgents
        $ launchctl load -w ~/Library/LaunchAgents/org.postgresql.postgres.plist
        $ env ARCHFLAGS="-arch x86_64" gem install pg

4. Install [Memcached](http://memcached.org/)

        $ brew install memcached
        
5. Install [Redis](http://redis.io/)

        $ brew install redis
