//Autobot script v1.0 - Adam White in 2019
//Helps use csv to export multiple files quickly

{
function Autobot(thisObj){
  function Autobot_buildUI(thisObj){
    var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette","Autobot",undefined, {resizeable:true});

    //Sets Up Window and Buttons
      res = "group{orientation:'column', alignment:['fill','top'] alignChildren:['fill','top'],\
            tit1: StaticText{text:'                  A   U   T   Ø   B   O   T ',justification:'center'},\
        pnl1: Panel{text:'Setup', orientation:'column', alignment:['fill','top'] alignChildren:['fill','top'],\
          grp1:Group{orienation:'row', alignment:['left','top'],\
            SetButt: Button{text:'ADD', preferredSize:[45,-1]},\
            ExprButt: Button{text:'EXPR', preferredSize:[45,-1]},\
            ATButt: Button{text:'ATEXT', preferredSize:[45,-1]},\
            HelpButt: Button{text:'?', preferredSize:[15,15], alignment:['left','top']},\
          },\
          grp2:Group{orientation:'row', alignment:['left','top'],\
            rad1: RadioButton{text:'JPG', value:true},\
            rad2: RadioButton{text:'PNG'},\
            rad3: RadioButton{text:'MOV'},\
          },\
        },\
        pnl2: Panel{text:'Autobot', orientation:'column', alignment:['fill','top'] alignChildren:['fill','fill'],\
          grp3:Group{orientation:'row', alignment:['fill','top'], alignChildren:['left','top'],\
            FoldButt: Button{text:'F', preferredSize:[20,-1]},\
            expText: StaticText{text:'~/Desktop/',characters:20, alignment:['fill','center']},\
          },\
          grp4:Group{orientation:'row', alignment:['left','top'], alignChildren:['left','top'],\
            txt01: StaticText{text:'# :', characters:2, alignment:['right','center']},\
            numText: EditText{text:'',characters:8, alignment:['left','center']},\
            awButt: Button{text:'Roll Out!',preferredSize:[100,20]},\
          },\
        },\
        grp5:Group{orienation:'column', alignment:['fill','top'],\
          grp6:Group{orientation:'row', alignment:['left','top'],\
            prog1: Progressbar{text:'progbar', maxvalue:0, value:0, preferredSize:[100,-1]},\
            feedback1: StaticText{text:'Waiting...', characters: 12, alignment:['left','center']},\
          },\
        },\
      }";
    myPanel.grp = myPanel.add(res);

    //Shortening window var paths
    var ctrlrButt = myPanel.grp.pnl1.grp1.SetButt;
    var exprButt = myPanel.grp.pnl1.grp1.ExprButt;
    var atbutt = myPanel.grp.pnl1.grp1.ATButt;
    var helpButt = myPanel.grp.pnl1.grp1.HelpButt;
    var radone = myPanel.grp.pnl1.grp2.rad1;
    var radtwo = myPanel.grp.pnl1.grp2.rad2;
    var radthr = myPanel.grp.pnl1.grp2.rad3;
    var foldButt = myPanel.grp.pnl2.grp3.FoldButt;
    var expFolder = myPanel.grp.pnl2.grp3.expText;
    var numCellsBox = myPanel.grp.pnl2.grp4.numText;
    var exeButt = myPanel.grp.pnl2.grp4.awButt;
    var extraGrp = myPanel.grp.grp5;
      extraGrp.visible = 0;
    var progbar = myPanel.grp.grp5.grp6.prog1;
    var feedbar = myPanel.grp.grp5.grp6.feedback1;

    //settings variables
    var expSetting;
    var outLoc = "~/Desktop/";

    //Button actions
    ctrlrButt.onClick = function (){
      autoCtrlr();
    }

    exprButt.onClick = function (){
      autoExpr();
    }

    atbutt.onClick = function (){
      autotext();
    }

    helpButt.onClick = function(){
      try{
        var hwin = new Window("dialog","Help",undefined);
        var hres = "group{orientation:'column', alignment:['fill','fill'], alignChildren:['fill','fill'],\
              about: StaticText{text:'', properties:{multiline:true}, preferredSize:[350,350]},\
            }";
          hwin.grp = hwin.add(hres);
          hwin.grp.about.text = "Autobot"+
          "\n" + "Created by Adam White 2019"+
          "\n" + "Script for automating exports with csv's"+
          "\n" + "\n"+
          "\n" + "- ADD button adds controllers, sliders, and text layers."+
          "\n" + "- EXPR button adds expressions to text layers"+
          "\n" + "- ATEXT button adds autosized text expressions to text layers"+
          "\n" + "- JPG, PNG, MOV change export settings"+
          "\n" + "- F button allows to pick an export location"+
          "\n" + "- # box is for number of cells in csv"+
          "\n" + "- Roll Out runs the script"+
          "\n" + "\n"+
          "\n" + "A few caveats:"+
          "\n" + "CVS must be present in comp for some functions to work."+
          "\n" + "Controller named DATA CONTROLLER"+
          "\n" + "First line of text named FIRST TEXT"+
          "\n" + "Second Line of text named SECOND TEXT"+
          "\n" + "Third Line of text named THIRD TEXT"+
          "\n" + "At least one of those need to be used and"+
          "\n" + "one should be linked to the csv for the filename to change."+
          "\n" + "Need an export preset labeled Full JPG"+
          "\n" + "Need an export preset labeled PNG + Alpha"+
          "\n" + "Number of Cells is the number of the last cell in csv"+
          "\n" + "Exports go to Media Encoder";



          hwin.grp.layout.layout(true);
          hwin.center();
          hwin.show();
      }catch(err){alert("Error at line" + err.line.toString() + "\r" + err.toString());}
    }

    foldButt.onClick = function (){
      //Folder dialog
      var expFolderPrompt = Folder.selectDialog("Output Path");
      // check for empty folder path, would happen if dialog was canceled
      if (expFolderPrompt != null){
        //Spaces caused weird issues with file output. decode puts the spaces back in
        str = decodeURI(expFolderPrompt);
        //when path picked it wouldn't put the last / on the end
        expFolder.text = str + "/";
        outLoc = str + "/";
      }else{}
    }

    exeButt.onClick = function (){
      extraGrp.visible = true;
      //radio buttons for setting export settings ie JPG PNG MOV
      if (radone.value){expSetting = 1;}
      else if (radtwo.value){expSetting = 2;}
      else if (radthr.value){expSetting = 3;}
      else {alert("Pick an export")}

      feedbar.text = "Starting...";
      // turns string into intergers
      var numCells = parseInt(numCellsBox.text);

      //as long as number box has numbers in it will run main function
      if ((!isNaN(numCells) == true) && numCells >0){
        //clears render queue before running function
        while (app.project.renderQueue.numItems > 0){
          app.project.renderQueue.item(app.project.renderQueue.numItems).remove();
          feedbar.text = "Clearing queue...";
          }
        //pass thru what, where, and how many to export.
        autobotexe(expSetting, outLoc, numCells);
      }else{alert("Please state number of cells")}

      feedbar.text = "Waiting..."
      extraGrp.visible = false;
    }


  //main function to find pieces and cycle thru data points while adding to AME
  function autobotexe(expSetting, outLoc, numCells){
    var prj = app.project;
    var curComp = app.project.activeItem;
    feedbar.text = "Searching for comps....";
    //searchs for needed layers
    var ctrl = findLayerByName("DATA CONTROLLER", true);
    var ftxt = findLayerByName("FIRST TEXT", true);
    var stxt = findLayerByName("SECOND TEXT", true);
    var ttxt = findLayerByName("THIRD TEXT", true);
    // search function returns array. this not only checks if empty but also narrows it to 1
    if (ctrl != null){ctrl = ctrl[0];}else{alert("Didn't Find Controller");throw new Error();}
    if (ftxt != null){ftxt = ftxt[0]}else{ftxt = null;}
    if (stxt != null){stxt = stxt[0]}else{stxt = null;}
    if (ttxt != null){ttxt = ttxt[0]}else{ttxt = null;}
    //saves slider
    var ctrlSlid = ctrl.property("Effects").property("Row Selector").property("Slider");

    // runs thru changing slider and taking that info for export names
    // then adds each thru renderqueue and ultimately AME
    for(var i = 0; i<=(numCells-2); i++){
      feedbar.text = (i + " out of " + numCells);
      progbar.maxvalue = numCells;
      progbar.value = i;
      ctrlSlid.setValue(i);
      if (ftxt != null){var ftxts = ftxt.property("Source Text").value.text;}else{ftxt = "";}
      if (stxt != null){var stxts = stxt.property("Source Text").value.text;}else{stxt = "";}
      if (ttxt != null){var ttxts = ttxt.property("Source Text").value.text;}else{ttxts = "";}
      var filNam = (ftxts + stxts + ttxts);
      if (expSetting === 1){
        app.executeCommand(2104); //Save Frame As
        app.project.renderQueue.item(1).outputModule(1).applyTemplate("Full JPG");
        app.project.renderQueue.item(1).outputModule(1).file = new File(outLoc + filNam + ".jpg");

      }else if (expSetting === 2){
        app.executeCommand(2104); //Save Frame As
        app.project.renderQueue.item(1).outputModule(1).file = new File(outLoc + filNam + ".png");
        app.project.renderQueue.item(1).outputModule(1).applyTemplate("PNG + Alpha");

      }else if (expSetting === 3){
        app.executeCommand(2161); //Add to Render Queue
        app.project.renderQueue.item(1).outputModule(1).file = new File(outLoc + filNam + ".mov");
        app.project.renderQueue.item(1).outputModule(1).applyTemplate("Lossless with Alpha");

      }else{}
      feedbar.text = "All Done!";
      app.project.renderQueue.queueInAME(false);
    }

  }

  function autoCtrlr(){
    //adds pieces for main function
    var prj = app.project;
    var curComp = app.project.activeItem;
    var ctxtthr = curComp.layers.addText();
      ctxtthr.name = "THIRD TEXT";
    var ctxttwo = curComp.layers.addText();
      ctxttwo.name = "SECOND TEXT";
    var ctxtone = curComp.layers.addText();
      ctxtone.name = "FIRST TEXT";
    var cshp = curComp.layers.addShape();
      cshp.name = "DATA CONTROLLER";
      cshp.effect.addProperty("ADBE Slider Control")("Slider").setValue(0);
      cshp.effect.property("ADBE Slider Control").name = "Row Selector";

    }

  function autoExpr(){
    //Adds expressions to text layers to use csv values with slider
    app.beginUndoGroup("AutoExpression");

    var prj = app.project;
    var curComp = app.project.activeItem;
    var csv = findLayerByName(".csv", false);
    if (csv != null){csv = csv[0];}else{alert("Didn't Find CSV"); throw new Error();}
    var ctrl = findLayerByName("DATA CONTROLLER", true);
    if (ctrl != null){ctrl = ctrl[0];}else{alert("Didn't Find Controller");throw new Error();}
    var exselLayers = curComp.selectedLayers;
    var exselLayerLeng = exselLayers.length;

    for (var w = 0; (w<exselLayerLeng); w++){
      var exsel = exselLayers[w];
      var exExpr = 'slid = Math.round(thisComp.layer("' + ctrl.name + '").effect("Row Selector")("Slider"));\n'+
      'footage("'+ csv.name + '").dataValue([0,slid]);';

      if(exsel instanceof TextLayer){
        exsel.property("Text").property("Source Text").expression = exExpr;
      }else{alert("Not Text layer");}
    }
    app.endUndoGroup();
  }

  function autotext(){
    //adds autosize text expressions to text layers
    app.beginUndoGroup("AutoSizeText");
    var prj = app.project;
    var curComp = app.project.activeItem;
    var atselLayers = curComp.selectedLayers;
    var atselLayerLeng = atselLayers.length;

    for (var v = 0;(v<atselLayerLeng); v++){

      atselLay = atselLayers[v];
      var ptCtrl = atselLay.property("Effects").addProperty("Point Control");
      ptCtrl.name = ("AutoEdge");


      var sclExp = '//autosizetext expression\n'+
        '//point ctrl x position determines cutoff\n'+
        '//If center aligned add *2 to the end of awSourSR\n'+
        '  \n'+
        'awtxtSR = thisLayer.sourceRectAtTime();\n'+
        'awSourSR = Math.abs(effect("AutoEdge")("Point")[0]-transform.position[0]);\n'+
        '  \n'+
        'if (awtxtSR.width > awSourSR){\n'+
        ' awmult = (awSourSR/awtxtSR.width);\n'+
        ' s = 100 * awmult;\n'+
        '}else{\n'+
        ' s = 100;\n'+
        '}\n'+
        ' \n'+
        '[s,s]';

      var ancExp = '//centers horizontally to scale from center\n'+
        '  \n'+
        'awtxtSR = thisLayer.sourceRectAtTime();\n'+
        'temp = (awtxtSR.height/2) * -1;\n'+
        '[value[0],temp]';

      atselLay.property("Transform").property("Scale").expression = sclExp;

      atselLay.property("Transform").property("Anchor Point").expression = ancExp;

    }
    app.endUndoGroup();
  }

  function findLayerByName(searchName, cs){
    //searches thru project and all layers. returns one's that match searchName
    if(typeof searchName === "string"){
      var myResults = new Array();
      var proj = app.project;
      var itemCount = proj.numItems;
      for(var i = 1; i<=itemCount; i++){
        var curItem = proj.item(i);
        if (curItem instanceof CompItem){
          var allLayers = curItem.layers;
          var allLayersLen = allLayers.length;
          for (var q=1; q<= allLayersLen; q++){
            var curLayer = allLayers[q];
            if(cs == true){
              var curLayerNam = curLayer.name;
                if((curLayerNam.indexOf(searchName)) != -1){
                  myResults.push(curLayer);
              }
            }else if(cs == false){
                var curLayerNam = curLayer.name.toLowerCase();
                var searchNam = searchName.toLowerCase();
                  if((curLayerNam.indexOf(searchNam)) != -1){
                    myResults.push(curLayer);
                  }
              }else{}
          }
        }
      }
      if(myResults.length>0){return myResults;}else{return null;}
    }else{throw new Error("findLayerByName:Function argument must be a string");}
  }

  function findCompByName(searchName, cs){
    //searches thru project and all comps. returns one's that match searchName
    if(typeof searchName === "string"){
      var proj, itemCount, compAry, curItem;
      compAry = new Array();
      proj = app.project;
      itemCount = proj.numItems;
      for(var i = 1; i<=itemCount; i++){
        curItem = proj.item(i);
        if(curItem instanceof CompItem){
          if(cs == true){
            var curItemNam = curItem.name;
              if((curItemName.indexOf(searchName)) != -1){
                compAry.push(curItem);
            }
          }else if(cs == false){
              var curItemNam = curItem.name.toLowerCase();
              var searchNam = searchName.toLowerCase();
                if((curItemNam.indexOf(searchNam)) != -1){
                  compAry.push(curItem);
                }
            }
          }else{}
      }
      if(compAry.length>0){return compAry;}else{return null;}
    }else{throw new Error("findCompByName:Function argument must be a string");}
  }


    //Rest is window build stuff
      myPanel.layout.layout(true);
      myPanel.grp.minimumSize = myPanel.grp.size;
      myPanel.layout.resize();
      myPanel.onResizing = myPanel.onResize = function(){this.layout.resize()};
      return myPanel;
    }
    var AutobotPal = Autobot_buildUI(thisObj);

    if((AutobotPal != null) && (AutobotPal instanceof Window)){
      AutobotPal.center();
      AutobotPal.show();
    }

  }
  Autobot(this);
  }
