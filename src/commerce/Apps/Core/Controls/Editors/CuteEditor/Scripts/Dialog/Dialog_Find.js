var OxOcfdb=["stringSearch","stringReplace","MatchWholeWord","MatchCase","document","checked","length","value","Nothing to search.","selection","body","type","Control","text","Finished Searching the document. Would you like to start again from the top?","","textedit","[[WordNotFound]]","[[WordReplaced]] : ","Please use replace funtion."];var editwin=Window_GetDialogArguments(window);var stringSearch=Window_GetElement(window,OxOcfdb[0x0],true);var stringReplace=Window_GetElement(window,OxOcfdb[0x1],true);var MatchWholeWord=Window_GetElement(window,OxOcfdb[0x2],true);var MatchCase=Window_GetElement(window,OxOcfdb[0x3],true);var editdoc=editwin[OxOcfdb[0x4]]; function get_ie_matchtype(){var Ox288=0x0;var Ox289=0x0;var Ox28a=0x0;if(MatchCase[OxOcfdb[0x5]]){ Ox289=0x4 ;} ;if(MatchWholeWord[OxOcfdb[0x5]]){ Ox28a=0x2 ;} ; Ox288=Ox289+Ox28a ;return (Ox288);}  ; function checkInputString(){if(stringSearch[OxOcfdb[0x7]][OxOcfdb[0x6]]<0x1){ alert(OxOcfdb[0x8]) ;return false;} else {return true;} ;}  ; function IsMatchSearchValue(Ox24){if(!Ox24){return false;} ;if(stringSearch[OxOcfdb[0x7]]==Ox24){return true;} ;if(MatchCase[OxOcfdb[0x5]]){return false;} ;return stringSearch[OxOcfdb[0x7]].toLowerCase()==Ox24.toLowerCase();}  ;var _ie_range=null; function IE_Restore(){ editwin.focus() ;if(_ie_range!=null){ _ie_range.select() ;} ;}  ; function IE_Save(){ editwin.focus() ; _ie_range=editdoc[OxOcfdb[0x9]].createRange() ;}  ; function MoveToBodyStart(){if(Browser_UseIESelection()){ range=document[OxOcfdb[0xa]].createTextRange() ; range.collapse(true) ; range.select() ; IE_Save() ;} else { editwin.getSelection().collapse(editdoc.body,0x0) ;} ;}  ; function DoFind(){if(Browser_UseIESelection()){ IE_Restore() ;var Ox128=editdoc[OxOcfdb[0x9]];if(Ox128[OxOcfdb[0xb]]==OxOcfdb[0xc]){ MoveToBodyStart() ;} ;var Ox19b=Ox128.createRange(); Ox19b.collapse(false) ;if(Ox19b.findText(stringSearch[OxOcfdb[0x7]],0x3b9aca00,get_ie_matchtype())){ Ox19b.select() ; IE_Save() ;return true;} ;} else {var Ox19b=editwin.getSelection().getRangeAt(0x0);if(editwin.find(stringSearch[OxOcfdb[0x7]],MatchCase[OxOcfdb[0x5]],false,false,MatchWholeWord.checked,false,false)){return true;} ;} ;}  ; function DoReplace(){if(Browser_UseIESelection()){ IE_Restore() ;var Ox128=editdoc[OxOcfdb[0x9]];if(Ox128[OxOcfdb[0xb]]!=OxOcfdb[0xc]){var Ox19b=Ox128.createRange();if(IsMatchSearchValue(Ox19b.text)){ Ox19b[OxOcfdb[0xd]]=stringReplace[OxOcfdb[0x7]] ; Ox19b.collapse(false) ; IE_Save() ;return true;} ;} ;} else {var Ox128=editwin.getSelection();if(IsMatchSearchValue(Ox128.toString())){ Ox128.deleteFromDocument() ; Ox128.getRangeAt(0x0).insertNode(editdoc.createTextNode(stringReplace.value)) ; Ox128.getRangeAt(0x0).collapse(false) ;return true;} ;} ;return false;}  ; function FindTxt(){if(!checkInputString()){return false;} ;while(true){if(DoFind()){return ;} ;if(!confirm(OxOcfdb[0xe])){return ;} ; MoveToBodyStart() ;} ;}  ; function ReplaceTxt(){if(!checkInputString()){return ;} ; DoReplace() ; FindTxt() ;}  ; function ReplaceAllTxt(){if(!checkInputString()){return ;} ;var Ox296=0x0;var msg=OxOcfdb[0xf]; MoveToBodyStart() ;if(Browser_UseIESelection()){var Ox128=editdoc[OxOcfdb[0x9]];if(Ox128[OxOcfdb[0xb]]==OxOcfdb[0xc]){ MoveToBodyStart() ;} ;var Ox297=Ox128.createRange();var Ox296=0x0;var msg=OxOcfdb[0xf]; Ox297.expand(OxOcfdb[0x10]) ; Ox297.collapse() ; Ox297.select() ;while(Ox297.findText(stringSearch[OxOcfdb[0x7]],0x3b9aca00,get_ie_matchtype())){ Ox297.select() ; Ox297[OxOcfdb[0xd]]=stringReplace[OxOcfdb[0x7]] ; Ox296++ ;} ;if(Ox296==0x0){ msg=OxOcfdb[0x11] ;} else { msg=OxOcfdb[0x12]+Ox296 ;} ; alert(msg) ;} else {if((stringReplace[OxOcfdb[0x7]]).indexOf(stringSearch.value)==-0x1){ DoFind() ;while(DoReplace()){ Ox296++ ; DoFind() ; FindTxt() ;} ;if(Ox296==0x0){ msg=OxOcfdb[0x11] ;} else { msg=OxOcfdb[0x12]+Ox296 ;} ; alert(msg) ;} else { FindTxt() ; alert(OxOcfdb[0x13]) ;} ;} ;}  ;