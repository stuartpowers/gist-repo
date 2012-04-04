#stutube/service.py
#Stuart Powers


import gdata
import gdata.youtube

print "in stutube/service.py"


YOUTUBE_SERVER = 'gdata.youtube.com'
YOUTUBE_SERVICE = 'youtube'
YOUTUBE_CLIENTLOGIN_AUTHENTICATION_URL = 'https://www.google.com/youtube/accounts/ClientLogin'
YOUTUBE_SUPPORTED_UPLOAD_TYPES = ('mov', 'avi', 'wmv', 'mpg', 'quicktime', 'flv', 'mp4', 'x-flv')
YOUTUBE_QUERY_VALID_TIME_PARAMETERS = ('today', 'this_week', 'this_month', 'all_time')
YOUTUBE_QUERY_VALID_ORDERBY_PARAMETERS = ('published', 'viewCount', 'rating', 'relevance')
YOUTUBE_QUERY_VALID_RACY_PARAMETERS = ('include', 'exclude')
YOUTUBE_QUERY_VALID_FORMAT_PARAMETERS = ('1', '5', '6')
YOUTUBE_STANDARDFEEDS = ('most_recent', 'recently_featured', 'top_rated', 'most_viewed','watch_on_mobile')
YOUTUBE_UPLOAD_URI = 'http://uploads.gdata.youtube.com/feeds/api/users'
YOUTUBE_UPLOAD_TOKEN_URI = 'http://gdata.youtube.com/action/GetUploadToken'
YOUTUBE_VIDEO_URI = 'http://gdata.youtube.com/feeds/api/videos'
YOUTUBE_USER_FEED_URI = 'http://gdata.youtube.com/feeds/api/users'
YOUTUBE_PLAYLIST_FEED_URI = 'http://gdata.youtube.com/feeds/api/playlists'

YOUTUBE_STANDARD_FEEDS = 'http://gdata.youtube.com/feeds/api/standardfeeds'
YOUTUBE_STANDARD_TOP_RATED_URI = '%s/%s' % (YOUTUBE_STANDARD_FEEDS, 'top_rated')
YOUTUBE_STANDARD_MOST_VIEWED_URI = '%s/%s' % (YOUTUBE_STANDARD_FEEDS, 'most_viewed')
YOUTUBE_STANDARD_RECENTLY_FEATURED_URI = '%s/%s' % (YOUTUBE_STANDARD_FEEDS, 'recently_featured')
YOUTUBE_STANDARD_WATCH_ON_MOBILE_URI = '%s/%s' % (YOUTUBE_STANDARD_FEEDS, 'watch_on_mobile')
YOUTUBE_STANDARD_TOP_FAVORITES_URI = '%s/%s' % (YOUTUBE_STANDARD_FEEDS, 'top_favorites')
YOUTUBE_STANDARD_MOST_RECENT_URI = '%s/%s' % (YOUTUBE_STANDARD_FEEDS, 'most_recent')
YOUTUBE_STANDARD_MOST_DISCUSSED_URI = '%s/%s' % (YOUTUBE_STANDARD_FEEDS, 'most_discussed')
YOUTUBE_STANDARD_MOST_LINKED_URI = '%s/%s' % (YOUTUBE_STANDARD_FEEDS, 'most_linked')
YOUTUBE_STANDARD_MOST_RESPONDED_URI = '%s/%s' % (YOUTUBE_STANDARD_FEEDS, 'most_responded')
YOUTUBE_SCHEMA = 'http://gdata.youtube.com/schemas'

YOUTUBE_RATING_LINK_REL = '%s#video.ratings' % YOUTUBE_SCHEMA

YOUTUBE_COMPLAINT_CATEGORY_SCHEME = '%s/%s' % (YOUTUBE_SCHEMA, 'complaint-reasons.cat')
YOUTUBE_SUBSCRIPTION_CATEGORY_SCHEME = '%s/%s' % (YOUTUBE_SCHEMA, 'subscriptiontypes.cat')

YOUTUBE_COMPLAINT_CATEGORY_TERMS = ('PORN', 'VIOLENCE', 'HATE', 'DANGEROUS', 'RIGHTS', 'SPAM')
YOUTUBE_CONTACT_STATUS = ('accepted', 'rejected')
YOUTUBE_CONTACT_CATEGORY = ('Friends', 'Family')



class StuTubeService(object):

    def Get(self, url, converter):
        return { 'url':url, 'converter':converter }['url']

    def GetYouTubeVideoFeed(self, uri):
        return self.Get(uri, converter=gdata.youtube.YouTubeVideoFeedFromString)

#....