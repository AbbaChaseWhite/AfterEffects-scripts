{
function AW_QuickBar(thisObj){
  function AW_QuickBar_buildUI(thisObj){
    var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette","AW_script",undefined, {resizeable:true});

    //Sets Up Window and Buttons
      res = "group{orientation:'column', alignment:['left','top'], spacing: 1 ,\
        grp1 : Group{orientation: 'row',spacing:1, alignment:['left','top'],\
          button01: IconButton{text:'JPG Desktop', helpTip:'JPG to Desktop', image:'/Applications/Adobe After Effects CC 2019/Scripts/ScriptUI Panels/AWScriptICons/QB_JPG_Desktop.png'},\
          button02: IconButton{text:'PNG Desktop', helpTip:'PNG to Desktop', image:'/Applications/Adobe After Effects CC 2019/Scripts/ScriptUI Panels/AWScriptICons/QB_PNG_Desktop.png'},\
          button03: IconButton{text:'MOV Desktop', helpTip:'Lossless w Alpha to Desktop', image:'/Applications/Adobe After Effects CC 2019/Scripts/ScriptUI Panels/AWScriptICons/QB_MOV_Desktop.png'},\
          button04: IconButton{text:'JPG Queue', helpTip:'JPG to Render Queue', image:'/Applications/Adobe After Effects CC 2019/Scripts/ScriptUI Panels/AWScriptICons/QB_JPG_Queue.png'},\
          button05: IconButton{text:'PNG Queue', helpTip:'PNG to Render Queue', image:'/Applications/Adobe After Effects CC 2019/Scripts/ScriptUI Panels/AWScriptICons/QB_PNG_Queue.png'},\
          button06: IconButton{text:'MOV Queue', helpTip:'Lossless w Alpha to Render Queue', image:'/Applications/Adobe After Effects CC 2019/Scripts/ScriptUI Panels/AWScriptICons/QB_MOV_Queue.png'},\
          button07: IconButton{text:'FlipH', helpTip:'Flip Horizontally', image:'/Applications/Adobe After Effects CC 2019/Scripts/ScriptUI Panels/AWScriptICons/QB_FlipH.png'},\
          button08: IconButton{text:'FlipV', helpTip:'Flip Vertically', image:'/Applications/Adobe After Effects CC 2019/Scripts/ScriptUI Panels/AWScriptICons/QB_FlipV.png'},\
          button09: IconButton{text:'Mask2Shape', helpTip:'Masks to Shapes', image:'/Applications/Adobe After Effects CC 2019/Scripts/ScriptUI Panels/AWScriptICons/QB_MtS.png'},\
          button10: IconButton{text:'Shape2Mask', helpTip:'Shapes to Masks', image:'/Applications/Adobe After Effects CC 2019/Scripts/ScriptUI Panels/AWScriptICons/QB_StM.png'},\
          button11: IconButton{text:'RenderQueue', helpTip:'Add to RenderQueue', image:'/Applications/Adobe After Effects CC 2019/Scripts/ScriptUI Panels/AWScriptICons/QB_RenderQueue.png'},\
          button12: IconButton{text:'MediaEncoder', helpTip:'Add to Media Encoder', image:'/Applications/Adobe After Effects CC 2019/Scripts/ScriptUI Panels/AWScriptICons/QB_MediaEncoder.png'},\
        },\
        }";

      myPanel.grp = myPanel.add(res);

      var awButt01 = myPanel.grp.grp1.button01; //JPG Desktop
      var awButt02 = myPanel.grp.grp1.button02; //PNG Desktop
      var awButt03 = myPanel.grp.grp1.button03; //MOV Desktop
      var awButt04 = myPanel.grp.grp1.button04; //JPG Queue
      var awButt05 = myPanel.grp.grp1.button05; //PNG Queue
      var awButt06 = myPanel.grp.grp1.button06; //MOV Queue
      var awButt07 = myPanel.grp.grp1.button07; //Flip Horizontally
      var awButt08 = myPanel.grp.grp1.button08; //Flip Vertically
      var awButt09 = myPanel.grp.grp1.button09; //Mask to Shapes
      var awButt10 = myPanel.grp.grp1.button10; //Shapes to Masks
      var awButt11 = myPanel.grp.grp1.button11; //Add to RenderQueue
      var awButt12 = myPanel.grp.grp1.button12; //Add to Media Encoder




      awButt01.onClick = function(){
        var selComp = app.project.activeItem
        var awDesktop = "~/Desktop/";
        app.executeCommand(2104); //Save Frame As
        app.project.renderQueue.item(app.project.renderQueue.numItems).outputModule(1).applyTemplate("Full JPG");
        app.project.renderQueue.item(app.project.renderQueue.numItems).outputModule(1).file = new File(awDesktop + selComp.name +".jpg");
        app.project.renderQueue.render();
      }

      awButt02.onClick = function(){
        var selComp = app.project.activeItem
        var awDesktop = "~/Desktop/";
        app.executeCommand(2104); //Save Frame As
        app.project.renderQueue.item(app.project.renderQueue.numItems).outputModule(1).applyTemplate("PNG+Alpha");
        app.project.renderQueue.item(app.project.renderQueue.numItems).outputModule(1).file = new File(awDesktop + selComp.name +".png");
        app.project.renderQueue.render();
      }

      awButt03.onClick = function(){
        var selComp = app.project.activeItem
        var awDesktop = "~/Desktop/";
        app.executeCommand(2161); //add to RenderQueue
        app.project.renderQueue.item(app.project.renderQueue.numItems).outputModule(1).applyTemplate("Lossless with Alpha");
        app.project.renderQueue.item(app.project.renderQueue.numItems).outputModule(1).file = new File(awDesktop + selComp.name +".mov");
        app.project.renderQueue.render();
      }

      awButt04.onClick = function (){
        var selComp = app.project.activeItem;
        app.executeCommand(2104); //Save Frame as
        var om1 = app.project.renderQueue.item(app.project.renderQueue.numItems).outputModule(1);
        om1.applyTemplate("Full JPG");
      }

      awButt05.onClick = function (){
        var selComp = app.project.activeItem;
        app.executeCommand(2104); //Save Frame as
        var om1 = app.project.renderQueue.item(app.project.renderQueue.numItems).outputModule(1);
        om1.applyTemplate("PNG+Alpha");
      }

      awButt06.onClick = function (){
        var selComp = app.project.activeItem;
        app.executeCommand(2161); //add to RenderQueue
        var om1 = app.project.renderQueue.item(app.project.renderQueue.numItems).outputModule(1);
        om1.applyTemplate("Lossless with Alpha");
      }

      awButt07.onClick = function (){
        app.executeCommand(3766); //Flip Horizontally
      }

      awButt08.onClick = function (){
        app.executeCommand(3767); //Flip Vertically
      }

      awButt09.onClick = function (){
        //Masks to Shapes
        var scriptFile = File('/Applications/Adobe After Effects CC 2019/Scripts/rd_MasksToShapes.jsx');
        var script;

        scriptFile.open('r');
        script = scriptFile.read();
        scriptFile.close();

        eval(script);
      }

      awButt10.onClick = function (){
        //Shapes to Masks
        var scriptFile = File('/Applications/Adobe After Effects CC 2019/Scripts/rd_ShapesToMasks.jsx');
        var script;

        scriptFile.open('r');
        script = scriptFile.read();
        scriptFile.close();

        eval(script);
      }

      awButt11.onClick = function (){
        app.executeCommand(2161); //Add to RenderQueue
      }

      awButt12.onClick = function (){
        app.executeCommand(3800); //Add to Media Encoder
      }



      //Rest is window build stuff
        myPanel.layout.layout(true);
        myPanel.grp.minimumSize = myPanel.grp.size;
        myPanel.layout.resize();
        myPanel.onResizing = myPanel.onResize = function(){this.layout.resize()};
        return myPanel;
      }
      var AW_QuickBarPal = AW_QuickBar_buildUI(thisObj);

      if((AW_QuickBarPal != null) && (AW_QuickBarPal instanceof Window)){
        AW_QuickBarPal.center();
        AW_QuickBarPal.show();
      }

    }
    AW_QuickBar(this);
    }
