//Fav Script Buttons
//A Panel with quick buttons for script
//Authored by: Adam White, Motion Graphics
//V1:

{
function AW_scriptButtons(thisObj){
  function AW_scriptButtons_buildUI(thisObj){
    var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette","AW_script",undefined, {resizeable:true});

  //Sets Up Window and Buttons
    res = "group{orientation:'column', alignment:['fill','fill'],\
        awImage01: Image{text:'Image', image:'/Applications/Adobe After Effects CC 2019/Scripts/awscriptbuttons.png'},\
        awButton01: Button{text:'Add Loop Exp', preferredSize:[150,20]},\
        awButton02: Button{text:'Add Wiggle Exp', preferredSize:[150,20]},\
        awButton03: Button{text:'Wiggle w Slider', preferredSize:[150,20]},\
        awButton04: Button{text:'Autosize Text', preferredSize:[150,20]},\
        awButton05: Button{text:'A U T Ø B O T', preferredSize:[150,20]},\
        grp1:Group{orientation: 'row',\
          awSeqNumText: EditText{preferredSize:[70,20]},\
          awButton06: Button{text:'Seq Lay', preferredSize:[70,20]},\
        },\
        awButton07: Button{text:'AddRibbonComps', preferredSize:[150,20]},\
        awButton08: Button{text: 'AddRibbonDivs', preferredSize:[150,20]},\
        awButton09: Button{text:'Render Queue', preferredSize:[150,20]},\
        awButton10: Button{text:'Render ME', preferredSize:[150,20]},\
      }";

    myPanel.grp = myPanel.add(res);

    var awButt01 = myPanel.grp.awButton01; //Loop Exp
    var awButt02 = myPanel.grp.awButton02; //Wiggle Exp
    var awButt03 = myPanel.grp.awButton03; //Wiggle w Slider
    var awButt04 = myPanel.grp.awButton04; //Autosize Text
    var awButt05 = myPanel.grp.awButton05; //Autobot
    var awText01 = myPanel.grp.grp1.awSeqNumText;
    var awButt06 = myPanel.grp.grp1.awButton06; //Sequence Layers
    var awButt07 = myPanel.grp.awButton07; //Add Ribbon Comps
    var awButt08 = myPanel.grp.awButton08; // Add Ribbon Divs
    var awButt09 = myPanel.grp.awButton09; //Render Queue
    var awButt10 = myPanel.grp.awButton10; //Render Media Encoder


    var SeqNumb = 1;


    awButt01.onClick = function (){
      //Add Loop Expression
      var selProp = app.project.activeItem.selectedProperties;
      selProp[0].expressionEnabled = true;
      selProp[0].expression = "loopOut(\"cycle\");\n"+
        "\n" +
        "//(cycle, offset, continue, pingpong), duration=2";

    }

    awButt02.onClick = function (){
      //Add Wiggle Expression
      var selProp = app.project.activeItem.selectedProperties;
      selProp[0].expressionEnabled = true;
      selProp[0].expression = "wiggle(2,100);";
    }

    awButt03.onClick = function (){
      //Add Wiggle Expression with Sliders Controls
      app.beginUndoGroup("WiggleSlider");

      var curComp = app.project.activeItem;
      var selLayers = curComp.selectedLayers;
      var sl = selLayers[0];
      var selProps = curComp.selectedProperties;
      var sp = selProps[0];

      sl.effect.addProperty("ADBE Slider Control")("Slider").setValue(2);
      sl.effect.property("ADBE Slider Control").name = "Wig Freq";
      sl.effect.addProperty("ADBE Slider Control")("Slider").setValue(100);
      sl.effect.property("Slider Control").name = "Wig Amount";

      sp.expressionEnabled = true;
      sp.expression = "wiggle(effect(\"Wig Freq\")(\"Slider\"),effect(\"Wig Amount\")(\"Slider\"));";

      app.endUndoGroup();
    }

    awButt04.onClick = function (){
      var scriptFile = File('/Applications/Adobe After Effects CC 2019/Scripts/aw_AutosizeText.jsx');
      var script;

      scriptFile.open('r');
      script = scriptFile.read();
      scriptFile.close();

      eval(script);
    }

    awButt05.onClick = function (){
      var scriptFile = File('/Applications/Adobe After Effects CC 2019/Scripts/Autobot.jsx');
      var script;

      scriptFile.open('r');
      script = scriptFile.read();
      scriptFile.close();

      eval(script);
    }

    awText01.onChange = function(){
        var SeqNumb = awText01.text;
        }

    awButt06.onClick = function () {
            app.beginUndoGroup("Sequencer");
            var offsetFrames = awText01.text;
            var curComp = app.project.activeItem;
            if (curComp.selectedLayers.length < 2) {
                alert("You need to select two or more layers to sequence.");
                } else {
                for (var i = 0; i < curComp.selectedLayers.length; i++)
                    {
                        var layer = curComp.selectedLayers[i];
                        layer.startTime = i * offsetFrames * curComp.frameDuration;
                    }
                }
            app.endUndoGroup();
        }

    awButt07.onClick = function (){
      var scriptFile = File('/Applications/Adobe After Effects CC 2019/Scripts/aw_addRibbonComps.jsx');
      var script;

      scriptFile.open('r');
      script = scriptFile.read();
      scriptFile.close();

      eval(script);
    }

    awButt08.onClick = function (){
      var scriptFile = File('/Applications/Adobe After Effects CC 2019/Scripts/aw_addRibbonDivs.jsx');
      var script;

      scriptFile.open('r');
      script = scriptFile.read();
      scriptFile.close();

      eval(script);
    }

    awButt09.onClick = function (){
      var scriptFile = File('/Applications/Adobe After Effects CC 2019/Scripts/aw_addRenderCompToQueue.jsx');
      var script;

      scriptFile.open('r');
      script = scriptFile.read();
      scriptFile.close();

      eval(script);
    }

    awButt10.onClick = function (){
      var scriptFile = File('/Applications/Adobe After Effects CC 2019/Scripts/aw_addRenderCompToME.jsx');
      var script;

      scriptFile.open('r');
      script = scriptFile.read();
      scriptFile.close();

      eval(script);
    }



    //Rest is window build stuff
      myPanel.layout.layout(true);
      myPanel.grp.minimumSize = myPanel.grp.size;
      myPanel.layout.resize();
      myPanel.onResizing = myPanel.onResize = function(){this.layout.resize()};
      return myPanel;
    }
    var AW_scriptButtonsPal = AW_scriptButtons_buildUI(thisObj);

    if((AW_scriptButtonsPal != null) && (AW_scriptButtonsPal instanceof Window)){
      AW_scriptButtonsPal.center();
      AW_scriptButtonsPal.show();
    }

  }
  AW_scriptButtons(this);
  }
