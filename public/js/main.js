$.ajaxSetup({ cache: false });

var Controller = Backbone.Router.extend({
    routes: {
        "": "start",
        "!/": "start", 
        "!/news": "news",
        "!/news/add": "newsadd",
        "!/newsnav/add": "newsnavadd",
        "!/news/:id": "newsitem",
        "!/event": "event",
        "!/event/add": "eventadd",
        "!/hall": "hall",
        "!/hall/add": "halladd",
        "!/newspaper": "newspaper",
        "!/newspaper/add": "newspaperadd",
        "!/questions": "questions",
        "!/questions/add": "questionsAdd",
        "!/quest/edit/:id": "questEdit",
        "!/questnav/add": "questnavAdd",
        "!/structure": "structure",
        "!/structure/view/:id": "structureView",
        "!/structure/add": "structureAdd",
        "!/structure/document/:id/:parenId": "document",
        "!/structure/mydoc": "mydoc",
        "!/structure/mydoc/:id": "mydocEdit",
        "!/structure/document/added": "documentAdded",
        "!/doc/edit/:id": "docEdit",
        "!/doc/access/:id": "docAccess",
        "!/search": "search",
        "!/search/group/:id": "searchGroup",
        "!/search/tree/:id": "searchTree",
        "!/login": "login",
        "!/logout": "logout",
        "!/logout/client": "logoutClient",
        "!/super": "sup"
    },

    _onAfter: function() {
      if (window.PIE) {
          $('.gray_box, .blue_box, .bl, .blue_box .in .stages ul, .blue_box .in .stages li ul li, .gray_box .in .admin ul li').each(function() {
              PIE.attach(this);
          });
      }
    },

    after: function(route, params) {
        $('#topmenu a').removeClass("current");
        $('#topmenu a[href="#'+route+'"]').addClass("current");
    },
    after: function(route, params) {
        $('#topmenu a').removeClass("current");
        $('#topmenu a[href="#'+route+'"]').addClass("current");
    },
    start: function() {
        var start = new StartView();
        var self = this;
        $('#content').slideUp(function() {
            $('#content').html(start.render().el);
            self._onAfter();
            $('#content').slideDown();
        });
    },
    news: function() {
       var news = new NewsView();
       var self = this;
        $('#content').animate({
              left: "-1500px"
            }, function() {
              $('#content').css('display', "none").css('left', "1500px");
              $('#content').html(news.render().el);
              self._onAfter();
              $('#content').css('display', "block").animate({
                left: "0px"
              });
            })
    },
    login: function() {
       var login = new LoginView();
       var self = this;
       $('#content').slideUp(function() {
            $('#content').html(login.render().el);
            self._onAfter();
            $('#content').slideDown();
        });
    },
    newsitem: function(id) {
       var newsItem = new NewsitemView({id: id});
       var self = this;
        $('#content').animate({
              bottom: "-1500px"
            }, function() {
              $('#content').css('display', "none").css('bottom', "1500px");
              $('#content').html(newsItem.render().el);
              self._onAfter();
              $('#content').css('display', "block").animate({
                bottom: "0px"
              });
            })
    },
    newsadd: function() {
       var newsAdd = new NewsaddView();
       var self = this;
       $('#content').slideUp(function() {
            $('#content').html(newsAdd.render().el);
            self._onAfter();
            CKEDITOR.replace('add_news_anonce', {
              width: "700px"
            });
            CKEDITOR.replace('add_news_text', {
              width: "700px"
            });
            $('#content').slideDown();
        });
    },
    newsnavadd: function() {
       var newsnavAdd = new NewsnavaddView();
       var self = this;
       $('#content').slideUp(function() {
            $('#content').html(newsnavAdd.render().el);
            self._onAfter();
            $('#content').slideDown();
        });
    },
    event: function() {
       var eventList = new EventListView();
       var self = this;
       $('#content').slideUp(function() {
            $('#content').html(eventList.render().el);
            self._onAfter();
            $('#content').slideDown();
        });
    },
    eventadd: function() {
       var eventAdd = new EventaddView();
       var self = this;
       $('#content').slideUp(function() {
            $('#content').html(eventAdd.render().el);
            self._onAfter();
            $('#content').slideDown();
            CKEDITOR.replace('add_event_text', {
              width: "700px"
            });
        });
    },
    hall: function() {
       var hall = new HallListView();
       var self = this;
       $('#content').slideUp(function() {
            $('#content').html(hall.render().el);
            self._onAfter();
            $('#content').slideDown();
        });
    },
    halladd: function() {
       var hallAdd = new HalladdView();
       var self = this;
       $('#content').slideUp(function() {
            $('#content').html(hallAdd.render().el);
            self._onAfter();
            $('#content').slideDown();
            CKEDITOR.replace('add_hall_text', {
              width: "700px"
            });
        });
    },
    newspaper: function() {
       var newspaperList = new NewspaperListView();
       var self = this;
       $('#content').slideUp(function() {
            $('#content').html(newspaperList.render().el);
            self._onAfter();
            $('#content').slideDown();
        });
    },
    newspaperadd: function() {
       var newspaperAdd = new NewspaperaddView();
       var self = this;
       $('#content').slideUp(function() {
            $('#content').html(newspaperAdd.render().el);
            self._onAfter();
            $('#content').slideDown();
            CKEDITOR.replace('text', {
              width: "700px"
            });
        });
    },
    questions: function() {
       var vopotv = new VopotvView();
       var self = this;
       $('#content').slideUp(function() {
            $('#content').html(vopotv.render().el);
            self._onAfter();
            $('#content').slideDown();
        });
    },
    questEdit: function(id) {
      var vEdit = new VeditView({id: id});
      var self = this;
      $('#content').slideUp(function() {
          $('#content').html(vEdit.render().el);
          self._onAfter();
          $('#content').slideDown();
      });
    },
    docEdit: function(id) {
      var docEdit = new DocEditView({id: id});
      var self = this;
      $('#content').slideUp(function() {
          $('#content').html(docEdit.render().el);
          self._onAfter();
          $('#content').slideDown();
      });
    },
    docAccess: function(id) {
      var docAccess = new DocAccessView({id: id});
      var self = this;
      $('#content').slideUp(function() {
          $('#content').html(docAccess.render().el);
          self._onAfter();
          $('#content').slideDown();
      });
    },
    questionsAdd: function() {
       var vopotvAdd = new VopotvAddView();
       var self = this;
       $('#content').slideUp(function() {
            $('#content').html(vopotvAdd.render().el);
            self._onAfter();
            $('#content').slideDown();
        });
    },
    questnavAdd: function() {
       var questnavAdd = new QuestnavAddView();
       var self = this;
       $('#content').slideUp(function() {
            $('#content').html(questnavAdd.render().el);
            self._onAfter();
            $('#content').slideDown();
        });
    },
    structure: function() {
       var str = new StrView();
       var self = this;
       $('#content').fadeOut(function() {
        $('#content').html(str.render().el);
        self._onAfter();
        $('#content').css("height", "0px").css("width", "0px").show();
        $('#content').animate({
          "width": "1000px",
          "height": "1000px"
        });
       });
    },
    structureView: function(id) {
       var strV = new StrVView({id: id});
       var self = this;
       $('#content').fadeOut(function() {
        $('#content').html(strV.render().el);
        self._onAfter();
        $('#content').css("height", "0px").css("width", "0px").show();
        $('#content').animate({
          "width": "1000px",
          "height": "1000px"
        });
       });
    },
    structureAdd: function() {
       var strAdd = new StrAddView();
       var self = this;
       console.log(strAdd);
       $('#content').slideUp(function() {
            $('#content').html(strAdd.render().el);
            self._onAfter();
            $('#content').slideDown();
        });
    },
    document: function(id, parentId) {
      var doc = new DocView({id: id, parentId: parentId});
      var self = this;
       $('#content').slideUp(function() {
            $('#content').html(doc.render().el);
            self._onAfter();
            $('#content').slideDown();
        });
    },
    mydoc: function() {
      var myDoc = new MyDocView();
      var self = this;
       $('#content').slideUp(function() {
            $('#content').html(myDoc.render().el);
            self._onAfter();
            $('#content').slideDown();
        });
    },
    mydocEdit: function(id) {
      var myDocEdit = new MyDocEditView({id: id});
      var self = this;
       $('#content').slideUp(function() {
            $('#content').html(myDocEdit.render().el);
            self._onAfter();
            $('#content').slideDown();
        });
    },
    documentAdded: function() {
      var docAdd = new DocAddedView();
      var self = this;
       $('#content').slideUp(function() {
            $('#content').html(docAdd.render().el);
            self._onAfter();
            $('#content').slideDown();
        });
    },
    search: function() {
       var search = new SearchFolderView();
       var self = this;
       $('#content').slideUp(function() {
            $('#content').html(search.render().el);
            self._onAfter();
            $('#content').slideDown();
        });
    },
    searchGroup: function(id) {
      var search = new SearchInView({id: id});
      var self = this;
       $('#content').slideUp(function() {
            $('#content').html(search.render().el);
            self._onAfter();
            $('#content').slideDown();
        });
    },
    searchTree: function(id) {
      var search = new SearchView({id: id});
      var self = this;
       $('#content').slideUp(function() {
            $('#content').html(search.render().el);
            self._onAfter();
            $('#content').slideDown();
        });
     },
    logout: function() {
      $.ajax(
        "/api/auth/logout",
        function(data) {
          window.user = {};
          window.location.hash = '#!/';
          window.location.reload();
          globalEvents.trigger('logouting', {});
        }
      );

      window.location.hash = '#!/';
      window.location.reload();
      
    },
    logoutClient: function() {
      $.ajax(
        "/api/auth/client/logout",
        function(data) {
          console.log("logout");
          window.clientUser = {};
          window.location.hash = '#!/structure';
          window.location.reload();
        }
      );
      window.location.hash = '#!/structure';
      window.location.reload();
    },
    sup: function() {
      var sup = new SuperView();
      var self = this;
      $('#content').slideUp(function() {
          $('#content').html(sup.render().el);
          self._onAfter();
          $('#content').slideDown();
      });
    }
});

var TopnavView = Backbone.View.extend({
  className: 'topnav',

  initialize: function () {
    this.template = $('#topnav-template').html();
    globalEvents.on('logining', this.onLogining, this);
    globalEvents.on('logouting', this.onLogouting, this);
  },

  render: function () {
    $(this.el).html(_.template(this.template, {}));
    
    return this;
  },

  onLogining: function() {
    $(".enter-item").hide();
    $(".exit-item").show();
    if(window.user.roleId != 10) {
      $(".hall-item").show();
      $(".event-item").show();  
    }
    console.log(window.user);
    $("#user-info").html("Добро пожаловать:"+window.user.fio+"<br />Должность: "+window.user.dol);
  },

  onLogouting: function() {
    $(".exit-item").hide();
    $(".hall-item").hide();
    $(".event-item").hide();
    $(".enter-item").show();
  }
});

var globalEvents = {};
_.extend(globalEvents, Backbone.Events);
window.user = {};
window.clientUser = {};

var controller = new Controller();

Backbone.history.start();

$(document).ready(function() {
  $.get(
    "/api/auth/status",
    function(data) {
      if(data.status == "ok") {
        window.user = data.user;
        globalEvents.trigger('logining', {});
      }
    }
  );

  var topNav = new TopnavView();
  $('#topnav-widget').html(topNav.render().el);

  $("body").on("click", "#left ul li a", function(e) {
      $(e.target).parents("ul").find("a").removeClass("current");
      $(e.target).addClass("current");
  });

  if (window.PIE) {
      $('.gray_box, .blue_box').each(function() {
          PIE.attach(this);
      });
  }
});