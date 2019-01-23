__docu_app_model__={"authorization":{
	"name": "authorization",
	"description": "Documentation of the EPackage authorization.",
	"classes": [
		{
			"name": "DOMitarbeiterBefugnis",
			"description": "Documentation of the EClass DOMitarbeiterBefugnis.",
			"package": "authorization",
			"attributes": [
				{
					"name": "Befugnis",
					"description": "Documentation of the EAttribute Befugnis.",
					"package": "ecore",
					"type": "Integer",
					"many": false
				},
				{
					"name": "Bezeichnung",
					"description": "Documentation of the EAttribute Bezeichnung.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "BezeichnungLang",
					"description": "Documentation of the EAttribute BezeichnungLang.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "DebitorenNr",
					"description": "Documentation of the EAttribute DebitorenNr.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "GueltigkeitsBeginnDatum",
					"description": "Documentation of the EAttribute GueltigkeitsBeginnDatum.",
					"package": "ecore",
					"type": "Date",
					"many": false
				},
				{
					"name": "GueltigkeitsEndDatum",
					"description": "Documentation of the EAttribute GueltigkeitsEndDatum.",
					"package": "ecore",
					"type": "Date",
					"many": false
				},
				{
					"name": "Land",
					"description": "Documentation of the EAttribute Land.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Mandant",
					"description": "Documentation of the EAttribute Mandant.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "NiederlassungsGebiet",
					"description": "Documentation of the EAttribute NiederlassungsGebiet.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Oid",
					"description": "Documentation of the EAttribute Oid.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Organisationseinheit",
					"description": "Documentation of the EAttribute Organisationseinheit.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "RaeumlichePruefung",
					"description": "Documentation of the EAttribute RaeumlichePruefung.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Region",
					"description": "Documentation of the EAttribute Region.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Status",
					"description": "Documentation of the EAttribute Status.",
					"package": "ecore",
					"type": "String",
					"many": false
				}
			]
		},
		{
			"name": "DOMitarbeiterQualifikationListe",
			"description": "Documentation of the EClass DOMitarbeiterQualifikationListe.",
			"package": "authorization",
			"references": [
				{
					"name": "MitarbeiterQualifikation",
					"description": "Documentation of the EReference MitarbeiterQualifikation.",
					"package": "authorization",
					"type": "DOMitarbeiterQualifikation",
					"many": true
				}
			]
		},
		{
			"name": "DOMitarbeiterQualifikation",
			"description": "Documentation of the EClass DOMitarbeiterQualifikation.",
			"package": "authorization",
			"attributes": [
				{
					"name": "DebitorenNr",
					"description": "Documentation of the EAttribute DebitorenNr.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "GueltigkeitsBeginnDatum",
					"description": "Documentation of the EAttribute GueltigkeitsBeginnDatum.",
					"package": "ecore",
					"type": "Date",
					"many": false
				},
				{
					"name": "GueltigkeitsEndDatum",
					"description": "Documentation of the EAttribute GueltigkeitsEndDatum.",
					"package": "ecore",
					"type": "Date",
					"many": false
				},
				{
					"name": "Mandant",
					"description": "Documentation of the EAttribute Mandant.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Oid",
					"description": "Documentation of the EAttribute Oid.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Qualifikation",
					"description": "Documentation of the EAttribute Qualifikation.",
					"package": "ecore",
					"type": "Integer",
					"many": false
				},
				{
					"name": "Status",
					"description": "Documentation of the EAttribute Status.",
					"package": "ecore",
					"type": "String",
					"many": false
				}
			]
		},
		{
			"name": "DOZuordnungBefugnisQualifikationListe",
			"description": "Documentation of the EClass DOZuordnungBefugnisQualifikationListe.",
			"package": "authorization",
			"references": [
				{
					"name": "ZuordnungBefugnisQualifikation",
					"description": "Documentation of the EReference ZuordnungBefugnisQualifikation.",
					"package": "authorization",
					"type": "DOZuordnungBefugnisQualifikation",
					"many": true
				}
			]
		},
		{
			"name": "DOZuordnungBefugnisQualifikation",
			"description": "Documentation of the EClass DOZuordnungBefugnisQualifikation.",
			"package": "authorization",
			"attributes": [
				{
					"name": "Befugnis",
					"description": "Documentation of the EAttribute Befugnis.",
					"package": "ecore",
					"type": "Integer",
					"many": false
				},
				{
					"name": "Mandant",
					"description": "Documentation of the EAttribute Mandant.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Oid",
					"description": "Documentation of the EAttribute Oid.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Qualifikation",
					"description": "Documentation of the EAttribute Qualifikation.",
					"package": "ecore",
					"type": "Integer",
					"many": false
				}
			]
		},
		{
			"name": "DOBefugnis",
			"description": "Documentation of the EClass DOBefugnis.",
			"package": "authorization",
			"attributes": [
				{
					"name": "Befugnis",
					"description": "Documentation of the EAttribute Befugnis.",
					"package": "ecore",
					"type": "Integer",
					"many": false
				},
				{
					"name": "Bezeichnung",
					"description": "Documentation of the EAttribute Bezeichnung.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "BezeichnungLang",
					"description": "Documentation of the EAttribute BezeichnungLang.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Mandant",
					"description": "Documentation of the EAttribute Mandant.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Oid",
					"description": "Documentation of the EAttribute Oid.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Sprache",
					"description": "Documentation of the EAttribute Sprache.",
					"package": "ecore",
					"type": "String",
					"many": false
				}
			]
		},
		{
			"name": "DOBefugnisListe",
			"description": "Documentation of the EClass DOBefugnisListe.",
			"package": "authorization",
			"references": [
				{
					"name": "Befugnis",
					"description": "Documentation of the EReference Befugnis.",
					"package": "authorization",
					"type": "DOBefugnis",
					"many": true
				}
			]
		},
		{
			"name": "DOQualifikationenUndBefugnisse",
			"description": "Documentation of the EClass DOQualifikationenUndBefugnisse.",
			"package": "authorization",
			"references": [
				{
					"name": "BefugnisListe",
					"description": "Documentation of the EReference BefugnisListe.",
					"package": "authorization",
					"type": "DOBefugnisListe",
					"many": false
				},
				{
					"name": "CallInfo",
					"description": "Documentation of the EReference CallInfo.",
					"package": "base",
					"type": "DOCallInfo",
					"many": false
				},
				{
					"name": "MitarbeiterBefugnisListe",
					"description": "Documentation of the EReference MitarbeiterBefugnisListe.",
					"package": "authorization",
					"type": "DOMitarbeiterBefugnisListe",
					"many": false
				},
				{
					"name": "MitarbeiterQualifikationListe",
					"description": "Documentation of the EReference MitarbeiterQualifikationListe.",
					"package": "authorization",
					"type": "DOMitarbeiterQualifikationListe",
					"many": false
				},
				{
					"name": "QualifikationListe",
					"description": "Documentation of the EReference QualifikationListe.",
					"package": "authorization",
					"type": "DOQualifikationListe",
					"many": false
				},
				{
					"name": "ZuordnungBefugnisQualifikationListe",
					"description": "Documentation of the EReference ZuordnungBefugnisQualifikationListe.",
					"package": "authorization",
					"type": "DOZuordnungBefugnisQualifikationListe",
					"many": false
				}
			]
		},
		{
			"name": "DOMitarbeiterBefugnisListe",
			"description": "Documentation of the EClass DOMitarbeiterBefugnisListe.",
			"package": "authorization",
			"references": [
				{
					"name": "MitarbeiterBefugnis",
					"description": "Documentation of the EReference MitarbeiterBefugnis.",
					"package": "authorization",
					"type": "DOMitarbeiterBefugnis",
					"many": true
				}
			]
		},
		{
			"name": "DOQualifikationListe",
			"description": "Documentation of the EClass DOQualifikationListe.",
			"package": "authorization",
			"references": [
				{
					"name": "Qualifikation",
					"description": "Documentation of the EReference Qualifikation.",
					"package": "authorization",
					"type": "DOQualifikation",
					"many": true
				}
			]
		},
		{
			"name": "DOQualifikation",
			"description": "Documentation of the EClass DOQualifikation.",
			"package": "authorization",
			"attributes": [
				{
					"name": "Bezeichnung",
					"description": "Documentation of the EAttribute Bezeichnung.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Mandant",
					"description": "Documentation of the EAttribute Mandant.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Oid",
					"description": "Documentation of the EAttribute Oid.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Qualifikation",
					"description": "Documentation of the EAttribute Qualifikation.",
					"package": "ecore",
					"type": "Integer",
					"many": false
				},
				{
					"name": "Sprache",
					"description": "Documentation of the EAttribute Sprache.",
					"package": "ecore",
					"type": "String",
					"many": false
				}
			]
		}
	]
},
"base":{
	"name": "base",
	"description": "Documentation of the EPackage base.",
	"classes": [
		{
			"name": "DOJournalProperties",
			"description": "Documentation of the EClass DOJournalProperties.",
			"package": "base",
			"references": [
				{
					"name": "JournalProperties",
					"description": "Documentation of the EReference JournalProperties.",
					"package": "base",
					"type": "DOJournalProperty",
					"many": true
				}
			]
		},
		{
			"name": "DOJournalProperty",
			"description": "Documentation of the EClass DOJournalProperty.",
			"package": "base",
			"attributes": [
				{
					"name": "Name",
					"description": "Documentation of the EAttribute Name.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Source",
					"description": "Documentation of the EAttribute Source.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Value",
					"description": "Documentation of the EAttribute Value.",
					"package": "ecore",
					"type": "String",
					"many": false
				}
			]
		},
		{
			"name": "DOEMailProperties",
			"description": "Documentation of the EClass DOEMailProperties.",
			"package": "base",
			"references": [
				{
					"name": "EmailProperties",
					"description": "Documentation of the EReference EmailProperties.",
					"package": "base",
					"type": "DOEmailProperty",
					"many": true
				}
			]
		},
		{
			"name": "DOEmailProperty",
			"description": "Documentation of the EClass DOEmailProperty.",
			"package": "base",
			"attributes": [
				{
					"name": "Name",
					"description": "Documentation of the EAttribute Name.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Source",
					"description": "Documentation of the EAttribute Source.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Value",
					"description": "Documentation of the EAttribute Value.",
					"package": "ecore",
					"type": "String",
					"many": false
				}
			]
		},
		{
			"name": "DOProp",
			"description": "Documentation of the EClass DOProp.",
			"package": "base",
			"attributes": [
				{
					"name": "Name",
					"description": "Documentation of the EAttribute Name.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Source",
					"description": "Documentation of the EAttribute Source.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Value",
					"description": "Documentation of the EAttribute Value.",
					"package": "ecore",
					"type": "String",
					"many": false
				}
			]
		},
		{
			"name": "DOCallInfo",
			"description": "Documentation of the EClass DOCallInfo.",
			"package": "base",
			"attributes": [
				{
					"name": "DQL",
					"description": "Documentation of the EAttribute DQL.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "ElapTime",
					"description": "Documentation of the EAttribute ElapTime.",
					"package": "ecore",
					"type": "Long",
					"many": false
				},
				{
					"name": "IntervalEnd",
					"description": "Documentation of the EAttribute IntervalEnd.",
					"package": "ecore",
					"type": "Long",
					"many": false
				},
				{
					"name": "IntervalStart",
					"description": "Documentation of the EAttribute IntervalStart.",
					"package": "ecore",
					"type": "Long",
					"many": false
				},
				{
					"name": "Message",
					"description": "Documentation of the EAttribute Message.",
					"package": "ecore",
					"type": "String",
					"many": false
				}
			]
		},
		{
			"name": "DOJournaleintrag",
			"description": "Documentation of the EClass DOJournaleintrag.",
			"package": "base",
			"attributes": [
				{
					"name": "ActionName",
					"description": "Documentation of the EAttribute ActionName.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "BusinessKey1",
					"description": "Documentation of the EAttribute BusinessKey1.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "BusinessKey2",
					"description": "Documentation of the EAttribute BusinessKey2.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "ClientVersion",
					"description": "Documentation of the EAttribute ClientVersion.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Duration",
					"description": "Documentation of the EAttribute Duration.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "EnevtValue1",
					"description": "Documentation of the EAttribute EnevtValue1.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "ErrorOccurred",
					"description": "Documentation of the EAttribute ErrorOccurred.",
					"package": "ecore",
					"type": "Boolean",
					"many": false
				},
				{
					"name": "EventType",
					"description": "Documentation of the EAttribute EventType.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "EventValue2",
					"description": "Documentation of the EAttribute EventValue2.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "EventValue3",
					"description": "Documentation of the EAttribute EventValue3.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Info",
					"description": "Documentation of the EAttribute Info.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Origin",
					"description": "Documentation of the EAttribute Origin.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "ProcessName",
					"description": "Documentation of the EAttribute ProcessName.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "ServerVersion",
					"description": "Documentation of the EAttribute ServerVersion.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "TechnicalKey",
					"description": "Documentation of the EAttribute TechnicalKey.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "User",
					"description": "Documentation of the EAttribute User.",
					"package": "ecore",
					"type": "String",
					"many": false
				}
			],
			"references": [
				{
					"name": "JournalData",
					"description": "Documentation of the EReference JournalData.",
					"package": "base",
					"type": "DOJournalData",
					"many": true
				},
				{
					"name": "Props",
					"description": "Documentation of the EReference Props.",
					"package": "base",
					"type": "DOProps",
					"many": false
				}
			]
		},
		{
			"name": "DOJournalData",
			"description": "Documentation of the EClass DOJournalData.",
			"package": "base",
			"attributes": [
				{
					"name": "Context",
					"description": "Documentation of the EAttribute Context.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Exception",
					"description": "Documentation of the EAttribute Exception.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "ExceptionType",
					"description": "Documentation of the EAttribute ExceptionType.",
					"package": "ecore",
					"type": "String",
					"many": false
				}
			]
		},
		{
			"name": "DOProps",
			"description": "Documentation of the EClass DOProps.",
			"package": "base",
			"references": [
				{
					"name": "Properties",
					"description": "Documentation of the EReference Properties.",
					"package": "base",
					"type": "DOProp",
					"many": true
				}
			]
		},
		{
			"name": "DOProperties",
			"description": "Documentation of the EClass DOProperties.",
			"package": "base",
			"references": [
				{
					"name": "Properties",
					"description": "Documentation of the EReference Properties.",
					"package": "base",
					"type": "DOProperty",
					"many": true
				}
			]
		},
		{
			"name": "DOProperty",
			"description": "Documentation of the EClass DOProperty.",
			"package": "base",
			"attributes": [
				{
					"name": "Name",
					"description": "Documentation of the EAttribute Name.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Source",
					"description": "Documentation of the EAttribute Source.",
					"package": "ecore",
					"type": "String",
					"many": false
				},
				{
					"name": "Value",
					"description": "Documentation of the EAttribute Value.",
					"package": "ecore",
					"type": "String",
					"many": false
				}
			]
		}
	]
}
}