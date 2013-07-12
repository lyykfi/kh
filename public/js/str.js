var StrView = Backbone.View.extend({
  className: 'str',

  initialize: function () {
    this.template = $('#str-template').html();
    this.strnav = new StrnavView();
    this.strbox = new StrboxView();
    this.stradmin = new StradminView();
    this.strauth = new StrAuthView();
    this.strclient = new StrClientView();
    this.tree = new TreeleftView();
  },

  render: function () {
    $(this.el).html(_.template(this.template, this.context));

  	$(this.el).append(this.strnav.el);
  	this.strnav.setElement(this.$(".strnav-widget")).render();

  	$(this.el).append(this.strbox.el);
  	this.strbox.setElement(this.$(".strbox-widget")).render();

    if(window.user.id) {
      $(this.el).append(this.stradmin.el);
      this.stradmin.setElement(this.$(".stradmin-widget")).render(); 
    } else {
      if(window.clientUser.id) {
        $(this.el).append(this.strclient.el);
        this.strclient.setElement(this.$(".strclient-widget")).render();
      } else {
        $(this.el).append(this.strauth.el);
        this.strauth.setElement(this.$(".strauth-widget")).render();  
      }
    }
    
    return this;
  }
});

var StrVView = Backbone.View.extend({
  className: 'strv',

  initialize: function (opt) {
    this.template = $('#strv-template').html();
    this.strnav = new StrnavView();
    this.strbox = new Strbox2View({id: opt.id});
    this.stradmin = new StradminView();
    this.strauth = new StrAuthView();
    this.strclient = new StrClientView();
    this.tree = new TreeleftView();

    this.id = opt.id;
  },

  render: function () {
    $(this.el).html(_.template(this.template, this.context));

    $(this.el).append(this.strnav.el);
    this.strnav.setElement(this.$(".strnav-widget")).render();

    $(this.el).append(this.strbox.el);
    this.strbox.setElement(this.$(".strbox-widget")).render();

    $(this.el).append(this.tree.el);
    this.tree.setElement(this.$(".tree-widget")).render(this.id);

    if(window.user.id) {
      $(this.el).append(this.stradmin.el);
      this.stradmin.setElement(this.$(".stradmin-widget")).render(); 
    } else {
      if(window.clientUser.id) {
        $(this.el).append(this.strclient.el);
        this.strclient.setElement(this.$(".strclient-widget")).render();
      } else {
        $(this.el).append(this.strauth.el);
        this.strauth.setElement(this.$(".strauth-widget")).render();  
      }
    }
    
    return this;
  }
});

var StrAddView = Backbone.View.extend({
  className: 'stradd',
  events: {
    "click #strAddCancel": "onStrAddCancel",
    "click #strAdd": "onStrAdd"
  },

  initialize: function () {
    this.template = $('#stradd-template').html();
    this.strnav = new StrnavView();
    this.strbox = new StrAddFView();
    this.stradmin = new StradminView();
  },

  render: function () {
    $(this.el).html(_.template(this.template, this.context));

    $(this.el).append(this.strnav.el);
    this.strnav.setElement(this.$(".strnav-widget")).render();

    $(this.el).append(this.strbox.el);
    this.strbox.setElement(this.$(".straddf-widget")).render();

    if(window.user.id) {
      $(this.el).append(this.stradmin.el);
      this.stradmin.setElement(this.$(".stradmin-widget")).render(); 
    }
    
    return this;
  },

  onStrAddCancel: function() {
    window.location.hash = '#!/structure';
  },

  onStrAdd: function() {
    var params = {};
    params.title = $("#add_str_title").val();
    params.leader = $("#add_str_leader").val();
    params.parentId = $("#add_str_parent option:selected").val();

    $.post('/api/structure/create', params, function(data) {
       window.location.hash = '#!/structure';
    })
    
  }
});

var StrAddFView = Backbone.View.extend({
  className: 'straddf',

  initialize: function () {
    console.log("aa");
    this.template = $('#straddf-template').html();
    this.treeSelect = new StrTreeSelectView();
  },

  render: function () {
    $(this.el).html(_.template(this.template, this.context));

    $(this.el).append(this.treeSelect.el);
    this.treeSelect.setElement(this.$(".strtreeselect-widget")).render();
    
    return this;
  }
});

var StrClientView = Backbone.View.extend({
  className: 'strclient',

  initialize: function () {
    this.template = $('#strclient-template').html();

    this.strList = new StrList();
    this.strList.fetch();
  },

  render: function () {
    $(this.el).html(_.template(this.template, { client: window.clientUser, structs: this.strList.toJSON() }));
    
    return this;
  }
});

var StrAuthView = Backbone.View.extend({
  className: 'straut',
  events: {
    "click #strEnter": "onStrEnter"
  },

  initialize: function () {
    this.template = $('#straut-template').html();
  },

  render: function () {
    $(this.el).html(_.template(this.template, this.context));
    
    return this;
  },

  onStrEnter: function(e) {
    var login = $("#add_strenter_login").val();
    var passw = $("#add_strenter_passw").val();
    var error = false;
    var self = this;

    $(".error").fadeOut();

    if(login.length == 0) {
      $(".error-login").fadeIn();
      error = true;
    }
    if(passw.length == 0) {
      $(".error-passw").fadeIn();
      error = true;
    }

    if(!error) {
      $.post(
        "/api/auth/client/login",
        {email: login, password: passw},
        function(data) {
          if(data.status == "ok") {
            window.clientUser = data.user;
            window.location.reload();
          } else {
            $(".error-not").fadeIn();
          }
        }
      );
    }
  }
});

var StrTreeSelectView = Backbone.View.extend({
  className: 'strtreeselect',

  initialize: function () {
    this.template = $('#strtreeselect-template').html();

    this.strList = new StrList();
    this.strList.fetch();
  },

  render: function () {
    $(this.el).html(_.template(this.template, { structs: this.strList.toJSON() }));
    
    return this;
  }
});

var StradminView = Backbone.View.extend({
  className: 'stradmin',

  initialize: function () {
    this.template = $('#stradmin-template').html();
  },

  render: function () {
    $(this.el).html(_.template(this.template, this.context));
    
    return this;
  }
});

var StrnavView = Backbone.View.extend({
  className: 'strnav',

  initialize: function () {
    this.template = $('#strnav-template').html();
  },

  render: function () {
    $(this.el).html(_.template(this.template, this.context));
    
    return this;
  }
});

var StrboxView = Backbone.View.extend({
  className: 'strbox',
  events: {
    "click .deleteStr": "onDeleteStr"
  },

  initialize: function () {
    this.template = $('#strbox-template').html();

    this.strList = new StrList();
    this.strList.fetch();
  },

  render: function () {
    $(this.el).html(_.template(this.template, { structs: this.strList.toJSON(), user: window.user, userClient: window.clientUser }));
    
    return this;
  },

  onDeleteStr: function(e) {
    var self = this;
    $.get(
      "/api/structure/delete/"+$(e.target).attr("data-id"),
      function(data) {
        window.location.reload();
      }
    );
  }
});

var Strbox2View = Backbone.View.extend({
  className: 'strbox',
  events: {
    "click .deleteStr": "onDeleteStr"
  },

  initialize: function (opt) {
    this.template = $('#strbox2-template').html();

    this.strList = new StrList();
    this.strList.fetch();
    this.id = opt.id;
  },

  render: function () {
    $(this.el).html(_.template(this.template, { id: this.id, structs: this.strList.toJSON(), user: window.user, userClient: window.clientUser }));
    
    return this;
  },

  onDeleteStr: function(e) {
    var self = this;
    $.get(
      "/api/structure/delete/"+$(e.target).attr("data-id"),
      function(data) {
        window.location.reload();
      }
    );
  }
});

var DocnodesView = Backbone.View.extend({
  className: 'docnodes',

  initialize: function () {
    this.template = $('#docnodes-template').html();

    this.docnodeList = new DocnodeList();
    this.docnodeList.fetch();
  },

  render: function (id) {
    $(this.el).html(_.template(this.template, { user: window.clientUser, comments: this.docnodeList.toJSON(), id: id }));
    
    return this;
  }
});

var MdView = Backbone.View.extend({
  className: 'md',
  events: {
    "click #access": "access",
    "click .den": "den"
  },

  initialize: function (opt) {
    this.template = $('#md-template').html();

    this.docList = new DocList();
    this.docList.fetch();

    this.access1 = new Access1Views();
    this.com = new DocnodesView();
    this.id = opt.id;
  },

  render: function () {
    $(this.el).html(_.template(this.template, { user: window.user, docs: this.docList.toJSON() }));

    $(this.el).append(this.access1.el);
    this.access1.setElement(this.$(".access1-widget")).render();

    $(this.el).append(this.com.el);
    this.com.setElement(this.$(".com-widget")).render(this.id);
    
    return this;
  },

  access: function(e) {

  },
  den: function(e) {

  }
});

var MdeView = Backbone.View.extend({
  className: 'md',
  events: {
    "click #access": "access",
    "click #deny": "deny"
  },

  initialize: function (opt) {
    this.template = $('#mde-template').html();

    this.docList = new DocList();
    this.docList.fetch();

    this.access1 = new Access1Views();
    this.com = new DocnodesView();
    this.id = opt.id;
  },

  render: function (id) {
    $(this.el).html(_.template(this.template, { user: window.user, docs: this.docList.toJSON(), id: id }));

    $(this.el).append(this.access1.el);
    this.access1.setElement(this.$(".access1-widget")).render();

    $(this.el).append(this.com.el);
    this.com.setElement(this.$(".com-widget")).render(this.id);
    
    return this;
  },
  access: function(e) {
    var docId = $("#docId").val();
    params = {};
    if(user.roleId == 11) {
      params.access1 = "1";
    }
    if(user.roleId == 12) {
      params.access2 = "1";
    }
    if(user.roleId == 13) {
      params.access3 = "1";
      params.status = 1;
    }

    var params2 = {};
    params2.docId = $("#docId").val();
    params2.text = $("#commentText").val();

    $.post("/api/doc/update/"+docId, params, function(data) {
      $.post("/api/docnode/create", params2, function(data) {
        window.location.hash = '#!/structure/mydoc';
      });
    });

    return false;
  },
  deny: function(e) {
    var docId = $("#docId").val();
    params = {};
    params.access1 = "";
    params.access2 = "";
    params.access3 = "";
    params.status = 2;

    var params2 = {};
    params2.docId = $("#docId").val();
    params2.text = $("#commentText").val();

    $.post("/api/doc/update/"+docId, params, function(data) {
      $.post("/api/docnode/create", params2, function(data) {
        window.location.hash = '#!/structure/mydoc';
      });
    });

    return false;
  }
});

var Access1Views = Backbone.View.extend({
  className: 'access1',

  initialize: function (opt) {
    this.template = $('#access1-template').html();

    this.userList = new UserList();
    this.userList.fetch();
  },

  render: function () {
    $(this.el).html(_.template(this.template, { user: window.user, users: this.userList.toJSON()}));
    
    return this;
  }
});


var DocView = Backbone.View.extend({
  className: 'doc',

  initialize: function (opt) {
    this.template = $('#doc-template').html();
    this.tree = new StrtreeView();
    this.doc = new DocListView();
    this.doca = new DocListAView();
    this.docs = new DocsView();
    this.md = new MdView(opt);
    this.adminList = new DocAdminView();
    this.strclient = new StrClientView();

    this.id = opt.id;
    this.parentId = opt.parentId;
  },

  render: function () {
    $(this.el).html(_.template(this.template, this.context));

    $(this.el).append(this.tree.el);
    this.tree.setElement(this.$(".strtree-widget")).render(this.parentId);
    

    if(window.clientUser.id && !window.user.id) {
      $(this.el).append(this.docs.el);
      this.docs.setElement(this.$(".docs-widget")).render();
    }

    if(window.user.id) {
      $(this.el).append(this.adminList.el);
      this.adminList.setElement(this.$(".docadmin-widget")).render();
    }

    if(window.clientUser.id) {
      $(this.el).append(this.strclient.el);
      this.strclient.setElement(this.$(".strclient-widget")).render();
    }

    if(!window.user.id) {
      $(this.el).append(this.doc.el);
      this.doc.setElement(this.$(".doclist-widget")).render(this.parentId);
    } else {
      $(this.el).append(this.doca.el);
      this.doca.setElement(this.$(".doclist-widget")).render(this.parentId, this.id);
    }
    
    return this;
  }
});

var MyDocView = Backbone.View.extend({
  className: 'MyDicView',
  events: {
    "click #add_file_show": "onAddFileShow",
    "click #onLoadDoc": "onLoadDoc",
    "click #onLoadDocCancel": "onLoadDocCancel"
  },

  initialize: function (opt) {

    this.template = $('#mydoc-template').html();
    this.tree = new StrtreeView();
    this.doc = new DocListView();
    this.doca = new DocListAView();
    this.docs = new DocsView();
    this.adminList = new DocAdminView();
    this.strclient = new StrClientView();
    this.md = new MdView({id: ""});
  },

  render: function () {
    $(this.el).html(_.template(this.template, this.context));


    if(window.clientUser.id && !window.user.id) {
      $(this.el).append(this.docs.el);
      this.docs.setElement(this.$(".docs-widget")).render();
    }

    if(window.user.id) {
      $(this.el).append(this.adminList.el);
      this.adminList.setElement(this.$(".docadmin-widget")).render();
    }

    if(window.clientUser.id) {
      $(this.el).append(this.strclient.el);
      this.strclient.setElement(this.$(".strclient-widget")).render();
    }

    

     $(this.el).append(this.md.el);
    this.md.setElement(this.$(".doclist-widget")).render();
    
    return this;
  },

  onAddFileShow: function(e) {
    $(e.target).hide();
    $(".add_file").slideDown();
  },
  onLoadDoc: function(e) {
    if($("#add_title").val().length > 0) {
      $("#add_file_form").submit();
    }
    return false;
  },
  onLoadDocCancel: function(e) {

  }
});

var MyDocEditView = Backbone.View.extend({
  className: 'MyDicEditView',
  events: {
    "click #add_file_show": "onAddFileShow",
    "click #onLoadDoc": "onLoadDoc",
    "click #onLoadDocCancel": "onLoadDocCancel",
    "click #access": "access",
    "click #deny": "deny"
  },

  initialize: function (opt) {
    this.template = $('#mydocedit-template').html();
    this.tree = new StrtreeView();
    this.doc = new DocListView();
    this.doca = new DocListAView();
    this.docs = new DocsView();
    this.adminList = new DocAdminView();
    this.strclient = new StrClientView();
    this.md = new MdeView(opt);

    this.id = opt.id;
  },

  render: function () {
    $(this.el).html(_.template(this.template, this.context));


    if(window.clientUser.id && !window.user.id) {
      $(this.el).append(this.docs.el);
      this.docs.setElement(this.$(".docs-widget")).render();
    }

    if(window.user.id) {
      $(this.el).append(this.adminList.el);
      this.adminList.setElement(this.$(".docadmin-widget")).render();
    }

    if(window.clientUser.id) {
      $(this.el).append(this.strclient.el);
      this.strclient.setElement(this.$(".strclient-widget")).render();
    }

     $(this.el).append(this.md.el);
    this.md.setElement(this.$(".mydoceditf-widget")).render(this.id);
    
    return this;
  }
});



var DocListView = Backbone.View.extend({
  className: 'doclist',
  events: {
    "click #add_file_show": "onAddFileShow",
    "click #onLoadDoc": "onLoadDoc"
  },

  initialize: function () {
    this.template = $('#doclist-template').html();

    this.docList = new DocList();
    this.docList.fetch();
  },

  render: function (id) {
    $(this.el).html(_.template(this.template, { user: window.clientUser, docs: this.docList.toJSON(), id: id }));
    
    return this;
  },

  onAddFileShow: function(e) {
    $(e.target).hide();
    $(".add_file").slideDown();
  },
  onLoadDoc: function(e) {
    if($("#add_title").val().length > 0) {
      $("#add_file_form").submit();
    }
    return false;
  }
});

var DocListAView = Backbone.View.extend({
  className: 'doclist',
  events: {
    "click #add_file_show": "onAddFileShow",
    "click #onLoadDoc": "onLoadDoc"
  },

  initialize: function () {
    this.template = $('#doclista-template').html();

    this.docList = new DocList();
    this.docList.fetch();
  },

  render: function (id, p) {
    $(this.el).html(_.template(this.template, { user: window.clientUser, docs: this.docList.toJSON(), id: id, parentId: p }));
    
    return this;
  },

  onAddFileShow: function(e) {
    $(e.target).hide();
    $(".add_file").slideDown();
  },
  onLoadDoc: function(e) {
    if($("#add_title").val().length > 0) {
      $("#add_file_form").submit();
    }
    return false;
  }
});

var DocsView = Backbone.View.extend({
  className: 'docs',

  initialize: function () {
    this.template = $('#docs-template').html();

    this.docList = new DocList();
    this.docList.fetch();
  },

  render: function () {
    $(this.el).html(_.template(this.template, { user: window.clientUser, docs: this.docList.toJSON() }));
    
    return this;
  }
});

var DocAddedView = Backbone.View.extend({
  className: 'docadded',

  initialize: function () {
    this.template = $('#docadded-template').html();

    this.tree = new StrtreeView();
    this.doc = new DocListView();

    this.docs = new DocsView();
  },

  render: function () {
    $(this.el).html(_.template(this.template, { user: window.clientUser }));

    $(this.el).append(this.tree.el);
    this.tree.setElement(this.$(".strtree-widget")).render();

    $(this.el).append(this.doc.el);
    this.doc.setElement(this.$(".doclist-widget")).render();

    if(window.clientUser.id && !window.user.id) {
      $(this.el).append(this.docs.el);
      this.docs.setElement(this.$(".docs-widget")).render();
    }
    
    return this;
  }
});

var DocEditView = Backbone.View.extend({
  className: 'docedit',

  initialize: function (opt) {
    this.template = $('#docedit-template').html();

    this.tree = new StrtreeView();
    this.doc = new DocListView();
    this.id = opt.id;

    this.docList = new DocList();
    this.docList.fetch();

    this.docs = new DocsView();
  },

  render: function () {
    $(this.el).html(_.template(this.template, { user: window.clientUser, id: this.id, docs: this.docList.toJSON() }));

    $(this.el).append(this.tree.el);
    this.tree.setElement(this.$(".strtree-widget")).render();

    $(this.el).append(this.doc.el);
    this.doc.setElement(this.$(".doclist-widget")).render();

    if(window.clientUser.id && !window.user.id) {
      $(this.el).append(this.docs.el);
      this.docs.setElement(this.$(".docs-widget")).render();
    }
    
    return this;
  }
});

var DocAccessView = Backbone.View.extend({
  className: 'docaccess',
  events: {
    "click #addAccess": "onAddAccess",
    "click #notAccess": "onNotAccess"
  },

  initialize: function (opt) {
    this.template = $('#docaccess-template').html();

    this.tree = new StrtreeView();
    this.doc = new DocListView();
    this.id = opt.id;

    this.docList = new DocList();
    this.docList.fetch();
  },

  render: function () {
    $(this.el).html(_.template(this.template, { user: window.clientUser, id: this.id, docs: this.docList.toJSON() }));

    $(this.el).append(this.tree.el);
    this.tree.setElement(this.$(".strtree-widget")).render();

    $(this.el).append(this.doc.el);
    this.doc.setElement(this.$(".doclist-widget")).render();
    
    return this;
  },

  onAddAccess: function(e) {
    var self = this;
    $.get(
      "/api/structure/delete/"+$(e.target).attr("data-id"),
      function(data) {
        window.location.reload();
      }
    );
  },
  notAccess: function(e) {
    
  }  
});


var DocAdminView = Backbone.View.extend({
  className: 'docsadmin',

  initialize: function () {
    this.template = $('#docsadmin-template').html();

    this.docList = new DocList();
    this.docList.fetch();
  },

  render: function () {
    $(this.el).html(_.template(this.template, { user: window.clientUser, docs: this.docList.toJSON() }));
    
    return this;
  }
});

var StrtreeView = Backbone.View.extend({
  className: 'strtree',
  events: {
    "click .tree_item": "onTreeItem"
  },

  initialize: function () {
    this.template = $('#strtree-template').html();

    this.strList = new StrList();
    this.strList.fetch();
  },

  render: function (parentId, id) {
    $(this.el).html(_.template(this.template, { structs: this.strList.toJSON(), parentId: parentId, id: id }));
    
    return this;
  }
});

var TreeleftView = Backbone.View.extend({
  className: 'treeleft',

  initialize: function () {
    this.template = $('#treeleft-template').html();

    this.strList = new StrList();
    this.strList.fetch();
  },

  render: function (id) {
    $(this.el).html(_.template(this.template, { structs: this.strList.toJSON(), id: id }));
    
    return this;
  },

  onTreeItem: function(e) {
    if(!window.user.id) {
      $(".tree_item").removeClass("current");
      $(e.target).addClass("current");

      $(".not").hide();
      $(".doc-list-items").fadeIn();

    }
     $(".col1").hide();
  }
});

var DocModel = Backbone.Model.extend();

var DocList = Backbone.Collection.extend({
   model: DocModel,
   url: '/api/doc/',
   parse: function(response, xhr) {
      return response.docs;
   }
});


var StrModel = Backbone.Model.extend();

var StrList = Backbone.Collection.extend({
   model: StrModel,
   url: '/api/structure/',
   parse: function(response, xhr) {
      return response.structs;
   }
});

var DocnodeModel = Backbone.Model.extend();

var DocnodeList = Backbone.Collection.extend({
   model: DocnodeModel,
   url: '/api/docnode/',
   parse: function(response, xhr) {
      return response.docnodes;
   }
});