var Docnode = function () {
	this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];
	
  this.list = function(req, resp, params) {
    var self = this;
    this.respondsWith = ['json', 'js']; 
    
    geddy.model.Docnode.all(function(err, docnodes) {
      self.respond({docnodes: docnodes});
    });
  };

  this.one = function(req, resp, params) {
    var self = this;
    this.respondsWith = ['json', 'js'];

    geddy.model.News.first(function(err, news) {
        self.respond({news: news});
    }); 
    
  };
  
  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.News.first(params.id, function(err, news) {
      if (!news) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      } else {
        self.respond({params: params, news: news});
      }
    });
  };
  
  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.News.first(params.id, function(err, news) {
      news.updateProperties(params);
      if (!news.isValid()) {
        params.errors = news.errors;
        self.transfer('edit');
      }

      news.save(function(err, data) {
        if (err) {
          params.errors = err;
          self.transfer('edit');
        } else {
          self.redirect({controller: self.name});
        }
      });
    });
  };
  
  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    this.respondsWith = ['json', 'js'];
    var self = this; 
    var doc = geddy.model.Docnode.create(params);

    doc.save(function(err, data) {
      self.respond({status: "ok"});
    });
  };
  
  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.News.all(function(err, news) {
    console.log(news);
      self.respond({params: params, news: news});
    });
  };
  
  this.destroy = function (req, resp, params) {
    var self = this;
    this.respondsWith = ['json', 'js'];

    geddy.model.News.remove(params.id, function(err) {
      if (err) {
        self.respond({status: "fail"});
      } else {
        self.respond({status: "ok"});
      }
    });
  };

};

exports.Docnode = Docnode;
