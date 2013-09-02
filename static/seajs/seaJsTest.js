/**
 * Created with JetBrains WebStorm.
 * User: yangjianyuan
 * Date: 13-8-31
 * Time: 下午3:31
 * To change this template use File | Settings | File Templates.
 */
define(basicPath+"/static/seajs/seaJsTest",function(require, exports, module){

    var $ = require("../../sea-modules/jquery/jquery/1.10.1/jquery-debug");
    var underscore  = require("../../sea-modules/gallery/underscore/1.4.4/underscore-debug")
    var backbone = require("../../sea-modules/gallery/backbone/1.0.0/backbone-debug");

    //console.log($);
    //console.log(underscore.template("Using 'with': <%= data.answer %>", {answer: 'no'}, {variable: 'data'}));
    //console.log(backbone);

    var url = "http://localhost:8080/account/getList" ;

    var SeaJsTestDemo = {
        Model:{},
        Collection:{},
        View:{},
        Template:{}
    };


    SeaJsTestDemo.Model.DemoItem = backbone.Model.extend({
        defaults: {
            "thisisdemo":  "thisisdemo"
        },
        initialize:function(){
            console.log("this DemoItem is init...");
        }
    });

    SeaJsTestDemo.Collection.DemoItemCollection = backbone.Collection.extend({
       model:SeaJsTestDemo.Model.DemoItem,
       initialize:function(){
           console.log("this DemoItemCollection is init...");
       },
       url:url,
       parse:function(response){
           return response ;
       }
    });


    SeaJsTestDemo.Template.DemoTemplate ="<% _.each(Items, function(item) { %> <li style='cursor:pointer;'><%= item.myName %></li> <% }); %>";
    SeaJsTestDemo.Template.ItemTemplate =" <a href='#'><%= myName %></a>";

    SeaJsTestDemo.View.DemoItemView = backbone.View.extend({
       el: "#demoTest",

       template: SeaJsTestDemo.Template.DemoTemplate,

       /*events:{
            "click li" :"changeClick"
        },*/

        initialize:function(){
            console.log("this is DemoItemView init...initialize ---"+this);
            this.render();
        },
        render:function(){
           /* console.log("this render this--"+this);
            var html = underscore.template(this.template,{Items:this.collection.toJSON()});
            console.log("this is html--"+html);
            $(this.el).html(html);*/

            /*for(var i in this.collection.models){
                console.log(this.collection.models[i]);
                this.appendItem(this.collection.models[i]);
            }*/
            $(this.el).html("");
            for(var i in this.collection.models){
                console.log(this.collection.models[i]);

                var itemView = new SeaJsTestDemo.View.ItemView({
                    model: this.collection.models[i]
                });
                $(this.el).append(itemView.render().el);
            }
        }

        /*appendItem:function(model){
            console.log("this appendItem--this--"+this.el);
            console.log("this el--"+this.el);
            $(this.el).append("<ul style='list-style: none;'> <li style='cursor:pointer;'><a href='#' >"+model.get("myName")+"</a></li> </ul>");
        },

       changeClick:function(){
            console.log("changeClick--"+this.model);
            console.log("changeClick--"+this.collection);
           // $(this.el).append("backbone changeClick again");
        }*/
    });


    SeaJsTestDemo.View.ItemView = backbone.View.extend({
        tagName : "li",

        template: SeaJsTestDemo.Template.ItemTemplate,

        events:{
            "click a" :"changeClick"
        },

        initialize:function(){
            console.log("this is ItemView init...initialize ---"+this);
            this.model.on("changeClick",this.changeClick,this);

        },
        render:function(){
            console.log("this ItemView render this--"+this);
            console.log("this.model--"+this.model+"--JSON--"+this.model.toJSON());
            var html = underscore.template(this.template,this.model.toJSON());
            console.log("this is html--"+html);
            $(this.el).html(html);
            return this;
        },

        changeClick:function(){
            console.log("changeClick--"+this.model+"---attribute--"+this.model.get("myId"));
            console.log("changeClick--"+this.collection);

            functions.getNewDemoCollection(this.model.get("myId"));
            //$(this.el).append("backbone changeClick again");
        }
    });


    var functions ={

        init : function(){
            document.getElementById("seaJsTest").innerHTML = "hello seaJs test!!!" ;

            functions.getDemoItemCollection(null);
        },

        getDemoItemCollection:function(id){
            var demoItemCollection = new SeaJsTestDemo.Collection.DemoItemCollection();
            demoItemCollection.fetch({
                async:false,
                data: $.param({ id: id})
            });
            new SeaJsTestDemo.View.DemoItemView({ collection: demoItemCollection });
            console.log("this is fetch is over--"+demoItemCollection.length);
        },

        getNewDemoCollection:function(id){
            functions.getDemoItemCollection(id);
        },

        change:function(){
            document.getElementById("seaJsTest").innerHTML = "hello ,change seaJs !!!" ;
            $("#seaJsTest").html("jquery change again");

        }
    };



    module.exports={
        init:functions.init,
        change:functions.change
    };
});
