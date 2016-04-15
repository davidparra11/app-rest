from pymongo import MongoClient

MONGODB_URI = 'mongodb://placeuser:12345678@52.33.133.243:27017/place'

class conection:
	def get_db(self):
	    try:
		client = MongoClient(MONGODB_URI)
	        db = client.get_default_database()
	        print "Connected successfully!!!"
	        return db
	    except pymongo.errors.ConnectionFailure, e:
	    	print "Could not connect to MongoDB: %s" % e

c = conection()
db = c.get_db()
