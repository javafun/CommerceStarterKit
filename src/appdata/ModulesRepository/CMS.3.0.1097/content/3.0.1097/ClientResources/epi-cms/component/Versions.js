//>>built
define("epi-cms/component/Versions",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/connect","dojo/aspect","dojo/dom-class","dojo/on","dojo/string","dojo/topic","dojo/when","dojox/html/entities","dgrid/OnDemandGrid","dgrid/Selection","epi","epi/dependency","epi/username","epi/shell/TypeDescriptorManager","epi/shell/command/_WidgetCommandProviderMixin","epi/shell/command/withConfirmation","epi/shell/widget/_FocusableMixin","epi/shell/widget/Tooltip","epi/shell/widget/dialog/Alert","epi/shell/widget/dialog/Confirmation","epi-cms/_MultilingualMixin","epi-cms/ApplicationSettings","epi-cms/core/ContentReference","epi-cms/component/command/DeleteVersion","epi-cms/component/command/DeleteLanguageBranch","epi-cms/component/command/SetCommonDraft","epi-cms/command/ShowAllLanguages","epi-cms/contentediting/ContentActionSupport","epi-cms/widget/_GridWidgetBase","epi/i18n!epi/cms/nls/episerver.cms.components.versions"],function(_1,_2,_3,_4,_5,_6,on,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,_15,_16,_17,_18,_19,_1a,_1b,_1c,_1d,_1e,_1f,_20){return _2([_1f,_11,_13,_17],{showAllLanguages:true,isMultilingual:false,_tooltips:[],postMixInProperties:function(){this._commonDrafts={};this.storeKeyName="epi.cms.contentversion";this.ignoreVersionWhenComparingLinks=false;this.inherited(arguments);this._currentContentLanguage=_18.currentContentLanguage;this.connect(this.store,"onItemChanged","_onItemChanged");var _21=_e.resolve("epi.storeregistry");this._contentStore=_21.get("epi.cms.contentdata");},buildRendering:function(){this.inherited(arguments);var _22=_2([_b,_c]);this.grid=new _22({columns:{language:{label:_d.resources.header.language},statusName:{label:_d.resources.header.status,renderCell:function(_23,_24,_25,_26){var _27=_23.statusName;if(_23.isCommonDraft){_27="<span class=\"dijitReset dijitInline dijitIcon epi-iconPrimary epi-floatRight\"></span>"+_23.statusName;}_25.innerHTML=_27;}},savedDate:{label:_d.resources.header.saved,formatter:this._localizeDate},savedBy:{label:_d.resources.header.by,formatter:this._createUserFriendlyUsername}},store:this.store,selectionMode:"single",selectionEvents:"click,dgrid-cellfocusin",sort:[{attribute:"savedDate",descending:true}]},this.domNode);},postCreate:function(){this.add("commands",new _1d({model:this}));this._commonDraftCommand=new _1c();this._deleteVersionCommand=new _1a();this._deleteLanguageBranchCommand=new _1b();this.own(_5.after(this._commonDraftCommand,"execute",_3.hitch(this,function(_28){_28.then(null,_3.hitch(this,this._onSetCommonDraftFailure));})),_5.after(this._deleteVersionCommand,"execute",_3.hitch(this,function(_29){_29.then(_3.hitch(this,this._onDeleteVersionSuccess),_3.hitch(this,this._onDeleteVersionFailure));})),_5.after(this._deleteLanguageBranchCommand,"execute",_3.hitch(this,function(_2a){_2a.then(_3.hitch(this,this._onDeleteVersionSuccess),_3.hitch(this,this._onDeleteVersionFailure));})));this.add("commands",this._commonDraftCommand);this.add("commands",_12(this._deleteVersionCommand,null,{title:_20.deletemenuitemtitle,heading:_20.deleteversion.note,description:_20.deleteversion.confirmquestion}));this._deleteLanguageBranchSettings={cancelActionText:_d.resources.action.cancel,setFocusOnConfirmButton:false};this.add("commands",_12(this._deleteLanguageBranchCommand,null,this._deleteLanguageBranchSettings));},startup:function(){if(this._started){return;}this.inherited(arguments);this.own(_5.around(this.grid,"renderRow",_3.hitch(this,this._aroundRenderRow)));this._toggleLanguage(this.showAllLanguages);this.fetchData();},_setShowAllLanguagesAttr:function(_2b){this._set("showAllLanguages",_2b);this._toggleFilterByLanguage(_2b);},destroy:function(){this.inherited(arguments);this._destroyTooltips();},_onItemChanged:function(){this.fetchData();},fetchData:function(){_9(this.getCurrentContent(),_3.hitch(this,function(_2c){if(!_2c){return;}this._destroyTooltips();if(_2c.accessMask&&!_1e.hasAccess(_2c.accessMask,_1e.accessLevel.Edit)||_2c.providerCapabilityMask&&!_1e.hasProviderCapability(_2c.providerCapabilityMask,_1e.providerCapabilities.Edit)){this._showErrorMessage(_d.resources.messages.nopermissiontoviewdata);this.set("isMultilingual",false);this._updateMenu(_2c);return;}var _2d={contentLink:_2c.contentLink};if(!this._allLanguages){_2d.language=this._currentContentLanguage;}this.grid.set("query",_2d);this.set("isMultilingual",true);}));},_destroyTooltips:function(){_1.forEach(this._tooltips,function(_2e){_2e.destroyRecursive();});this._tooltips=[];},_aroundRenderRow:function(_2f){return _3.hitch(this,function(_30){if(_30.isCommonDraft){var _31=this._commonDrafts[_30.language];if(_31&&_31!=_30.contentLink){this._removeCommonDraft(_31);}this._commonDrafts[_30.language]=_30.contentLink;}var row=_2f.apply(this.grid,arguments);_6.toggle(row,"dgrid-row-published",_30.status===_1e.versionStatus.Published);this._createTooltip(_30,row);return row;});},_onSelect:function(e){var _32=e.rows[0].data;this._updateMenu(_32);this.inherited(arguments);},_updateMenu:function(_33){this._commonDraftCommand.set("model",_33);this._deleteVersionCommand.set("model",_33);_9(this._contentStore.get(_33.contentLink),_3.hitch(this,function(_34){if(_34&&_34.currentLanguageBranch){var _35=_3.replace(_20.deletelanguagebranch.label,[_34.currentLanguageBranch.name]),_36=_10.getResourceValue(_34.typeIdentifier,"deletelanguagebranchdescription");_3.mixin(this._deleteLanguageBranchSettings,{confirmActionText:_35,description:_3.replace(_36,[_a.encode(_34.name),_34.currentLanguageBranch.name]),title:_35});this._deleteLanguageBranchCommand.set("label",_35);}this._deleteLanguageBranchCommand.set("model",_34);}));},_showNotificationMessage:function(_37){var _38=new _15({title:_20.notificationtitle,description:_37});_38.show();},_selectCommonDraftVersion:function(uri){var _39={uri:uri};_8.publish("/epi/shell/context/request",_39,{sender:null});},_onDeleteVersionSuccess:function(){var _3a=new _19(this.grid.get("query").contentLink);this._selectCommonDraftVersion("epi.cms.contentdata:///"+_3a.createVersionUnspecificReference().toString());},_onDeleteVersionFailure:function(_3b){if(!_3b||!_3b.status){return;}else{if(_3b.status===403){this._showNotificationMessage(_20.deleteversion.cannotdeletepublished);}else{this._showNotificationMessage(_20.deleteversion.cannotdelete);}}},_onSetCommonDraftFailure:function(){this._showNotificationMessage(_20.setcommondraft.failuremessage);},_removeCommonDraft:function(_3c){if(_3c){var _3d=this.grid.row(_3c).data;if(_3d){_3d.isCommonDraft=false;}}},_toggleFilterByLanguage:function(_3e){_9(this.getCurrentContext(),_3.hitch(this,function(_3f){var _40={contentLink:_3f.id};if(!_3e){_40.language=this._currentContentLanguage;}this._toggleLanguage(_3e);this.grid.set("query",_40);this._allLanguages=_3e;}));},_toggleLanguage:function(_41){var _42=_41?"table-cell":"none";this.grid.styleColumn("language",_7.substitute("display:${0};",[_42]));},_createTooltip:function(_43,row){var _44=[{label:_d.resources.header.language,text:_d.resources.language[_43.language]},{label:_d.resources.header.name,text:_43.name},{label:_d.resources.header.status,text:_1e.getVersionStatus(_43.status)},{label:_20.saved,text:this._localizeDate(_43.savedDate),htmlEncode:false},{label:_20.by,text:_f.toUserFriendlyString(_43.savedBy,null,true)}];var _45=new _14({connectId:row,tooltipRows:_44});this._tooltips.push(_45);}});});