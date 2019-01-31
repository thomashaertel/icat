__docu_app_graph__={"authorization":{
  "position": null,
  "size": {
    "width": 10000.0,
    "height": 8000.0
  },
  "layoutOptions": null,
  "canvasBounds": {
    "x": -1.0,
    "y": -1.0,
    "width": -1.0,
    "height": -1.0
  },
  "revision": 0,
  "type": "graph",
  "id": "graph",
  "children": [
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "authorization/DOMitarbeiterBefugnis",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "authorization/DOMitarbeiterBefugnis_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "authorization/DOMitarbeiterBefugnis_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "authorization/DOMitarbeiterBefugnis_iconlabel"
                }
              ]
            },
            {
              "text": "DOMitarbeiterBefugnis",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "authorization/DOMitarbeiterBefugnis_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "authorization/DOMitarbeiterBefugnis_attrs",
          "children": [
            {
              "text": " - Befugnis : EIntegerObject",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterBefugnis_Befugnis"
            },
            {
              "text": " - Bezeichnung : EString",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterBefugnis_Bezeichnung"
            },
            {
              "text": " - BezeichnungLang : EString",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterBefugnis_BezeichnungLang"
            },
            {
              "text": " - DebitorenNr : EString",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterBefugnis_DebitorenNr"
            },
            {
              "text": " - GueltigkeitsBeginnDatum : EDate",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterBefugnis_GueltigkeitsBeginnDatum"
            },
            {
              "text": " - GueltigkeitsEndDatum : EDate",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterBefugnis_GueltigkeitsEndDatum"
            },
            {
              "text": " - Land : EString",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterBefugnis_Land"
            },
            {
              "text": " - Mandant : EString",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterBefugnis_Mandant"
            },
            {
              "text": " - NiederlassungsGebiet : EString",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterBefugnis_NiederlassungsGebiet"
            },
            {
              "text": " - Oid : EString",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterBefugnis_Oid"
            },
            {
              "text": " - Organisationseinheit : EString",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterBefugnis_Organisationseinheit"
            },
            {
              "text": " - RaeumlichePruefung : EString",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterBefugnis_RaeumlichePruefung"
            },
            {
              "text": " - Region : EString",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterBefugnis_Region"
            },
            {
              "text": " - Status : EString",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterBefugnis_Status"
            }
          ]
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "authorization/DOMitarbeiterQualifikationListe",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "authorization/DOMitarbeiterQualifikationListe_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "authorization/DOMitarbeiterQualifikationListe_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "authorization/DOMitarbeiterQualifikationListe_iconlabel"
                }
              ]
            },
            {
              "text": "DOMitarbeiterQualifikationListe",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "authorization/DOMitarbeiterQualifikationListe_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "authorization/DOMitarbeiterQualifikationListe_attrs",
          "children": []
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-edge",
        "aggregation"
      ],
      "multiplicitySource": "0..1",
      "multiplicityTarget": "0..*",
      "sourceId": "authorization/DOMitarbeiterQualifikationListe",
      "targetId": "authorization/DOMitarbeiterQualifikation",
      "type": "edge:aggregation",
      "id": "DOMitarbeiterQualifikationListe_DOMitarbeiterQualifikation_MitarbeiterQualifikation",
      "children": [
        {
          "text": "MitarbeiterQualifikation",
          "type": "label:text",
          "id": "DOMitarbeiterQualifikationListe_DOMitarbeiterQualifikation_MitarbeiterQualifikation_name"
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "authorization/DOMitarbeiterQualifikation",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "authorization/DOMitarbeiterQualifikation_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "authorization/DOMitarbeiterQualifikation_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "authorization/DOMitarbeiterQualifikation_iconlabel"
                }
              ]
            },
            {
              "text": "DOMitarbeiterQualifikation",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "authorization/DOMitarbeiterQualifikation_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "authorization/DOMitarbeiterQualifikation_attrs",
          "children": [
            {
              "text": " - DebitorenNr : EString",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterQualifikation_DebitorenNr"
            },
            {
              "text": " - GueltigkeitsBeginnDatum : EDate",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterQualifikation_GueltigkeitsBeginnDatum"
            },
            {
              "text": " - GueltigkeitsEndDatum : EDate",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterQualifikation_GueltigkeitsEndDatum"
            },
            {
              "text": " - Mandant : EString",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterQualifikation_Mandant"
            },
            {
              "text": " - Oid : EString",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterQualifikation_Oid"
            },
            {
              "text": " - Qualifikation : EIntegerObject",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterQualifikation_Qualifikation"
            },
            {
              "text": " - Status : EString",
              "type": "label:text",
              "id": "authorization/DOMitarbeiterQualifikation_Status"
            }
          ]
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "authorization/DOZuordnungBefugnisQualifikationListe",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "authorization/DOZuordnungBefugnisQualifikationListe_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "authorization/DOZuordnungBefugnisQualifikationListe_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "authorization/DOZuordnungBefugnisQualifikationListe_iconlabel"
                }
              ]
            },
            {
              "text": "DOZuordnungBefugnisQualifikationListe",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "authorization/DOZuordnungBefugnisQualifikationListe_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "authorization/DOZuordnungBefugnisQualifikationListe_attrs",
          "children": []
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-edge",
        "aggregation"
      ],
      "multiplicitySource": "0..1",
      "multiplicityTarget": "0..*",
      "sourceId": "authorization/DOZuordnungBefugnisQualifikationListe",
      "targetId": "authorization/DOZuordnungBefugnisQualifikation",
      "type": "edge:aggregation",
      "id": "DOZuordnungBefugnisQualifikationListe_DOZuordnungBefugnisQualifikation_ZuordnungBefugnisQualifikation",
      "children": [
        {
          "text": "ZuordnungBefugnisQualifikation",
          "type": "label:text",
          "id": "DOZuordnungBefugnisQualifikationListe_DOZuordnungBefugnisQualifikation_ZuordnungBefugnisQualifikation_name"
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "authorization/DOZuordnungBefugnisQualifikation",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "authorization/DOZuordnungBefugnisQualifikation_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "authorization/DOZuordnungBefugnisQualifikation_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "authorization/DOZuordnungBefugnisQualifikation_iconlabel"
                }
              ]
            },
            {
              "text": "DOZuordnungBefugnisQualifikation",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "authorization/DOZuordnungBefugnisQualifikation_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "authorization/DOZuordnungBefugnisQualifikation_attrs",
          "children": [
            {
              "text": " - Befugnis : EIntegerObject",
              "type": "label:text",
              "id": "authorization/DOZuordnungBefugnisQualifikation_Befugnis"
            },
            {
              "text": " - Mandant : EString",
              "type": "label:text",
              "id": "authorization/DOZuordnungBefugnisQualifikation_Mandant"
            },
            {
              "text": " - Oid : EString",
              "type": "label:text",
              "id": "authorization/DOZuordnungBefugnisQualifikation_Oid"
            },
            {
              "text": " - Qualifikation : EIntegerObject",
              "type": "label:text",
              "id": "authorization/DOZuordnungBefugnisQualifikation_Qualifikation"
            }
          ]
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "authorization/DOBefugnis",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "authorization/DOBefugnis_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "authorization/DOBefugnis_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "authorization/DOBefugnis_iconlabel"
                }
              ]
            },
            {
              "text": "DOBefugnis",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "authorization/DOBefugnis_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "authorization/DOBefugnis_attrs",
          "children": [
            {
              "text": " - Befugnis : EIntegerObject",
              "type": "label:text",
              "id": "authorization/DOBefugnis_Befugnis"
            },
            {
              "text": " - Bezeichnung : EString",
              "type": "label:text",
              "id": "authorization/DOBefugnis_Bezeichnung"
            },
            {
              "text": " - BezeichnungLang : EString",
              "type": "label:text",
              "id": "authorization/DOBefugnis_BezeichnungLang"
            },
            {
              "text": " - Mandant : EString",
              "type": "label:text",
              "id": "authorization/DOBefugnis_Mandant"
            },
            {
              "text": " - Oid : EString",
              "type": "label:text",
              "id": "authorization/DOBefugnis_Oid"
            },
            {
              "text": " - Sprache : EString",
              "type": "label:text",
              "id": "authorization/DOBefugnis_Sprache"
            }
          ]
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "authorization/DOBefugnisListe",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "authorization/DOBefugnisListe_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "authorization/DOBefugnisListe_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "authorization/DOBefugnisListe_iconlabel"
                }
              ]
            },
            {
              "text": "DOBefugnisListe",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "authorization/DOBefugnisListe_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "authorization/DOBefugnisListe_attrs",
          "children": []
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-edge",
        "aggregation"
      ],
      "multiplicitySource": "0..1",
      "multiplicityTarget": "0..*",
      "sourceId": "authorization/DOBefugnisListe",
      "targetId": "authorization/DOBefugnis",
      "type": "edge:aggregation",
      "id": "DOBefugnisListe_DOBefugnis_Befugnis",
      "children": [
        {
          "text": "Befugnis",
          "type": "label:text",
          "id": "DOBefugnisListe_DOBefugnis_Befugnis_name"
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "authorization/DOQualifikationenUndBefugnisse",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "authorization/DOQualifikationenUndBefugnisse_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "authorization/DOQualifikationenUndBefugnisse_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "authorization/DOQualifikationenUndBefugnisse_iconlabel"
                }
              ]
            },
            {
              "text": "DOQualifikationenUndBefugnisse",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "authorization/DOQualifikationenUndBefugnisse_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "authorization/DOQualifikationenUndBefugnisse_attrs",
          "children": []
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-edge",
        "aggregation"
      ],
      "multiplicitySource": "0..1",
      "multiplicityTarget": "0..1",
      "sourceId": "authorization/DOQualifikationenUndBefugnisse",
      "targetId": "authorization/DOBefugnisListe",
      "type": "edge:aggregation",
      "id": "DOQualifikationenUndBefugnisse_DOBefugnisListe_BefugnisListe",
      "children": [
        {
          "text": "BefugnisListe",
          "type": "label:text",
          "id": "DOQualifikationenUndBefugnisse_DOBefugnisListe_BefugnisListe_name"
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-edge",
        "aggregation"
      ],
      "multiplicitySource": "0..1",
      "multiplicityTarget": "0..1",
      "sourceId": "authorization/DOQualifikationenUndBefugnisse",
      "targetId": "base/DOCallInfo",
      "type": "edge:aggregation",
      "id": "DOQualifikationenUndBefugnisse_DOCallInfo_CallInfo",
      "children": [
        {
          "text": "CallInfo",
          "type": "label:text",
          "id": "DOQualifikationenUndBefugnisse_DOCallInfo_CallInfo_name"
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node",
        "foreign-package"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "base/DOCallInfo",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "base/DOCallInfo_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "base/DOCallInfo_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "base/DOCallInfo_iconlabel"
                }
              ]
            },
            {
              "text": "DOCallInfo",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "base/DOCallInfo_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "base/DOCallInfo_attrs",
          "children": [
            {
              "text": " - DQL : EString",
              "type": "label:text",
              "id": "base/DOCallInfo_DQL"
            },
            {
              "text": " - ElapTime : ELongObject",
              "type": "label:text",
              "id": "base/DOCallInfo_ElapTime"
            },
            {
              "text": " - IntervalEnd : ELongObject",
              "type": "label:text",
              "id": "base/DOCallInfo_IntervalEnd"
            },
            {
              "text": " - IntervalStart : ELongObject",
              "type": "label:text",
              "id": "base/DOCallInfo_IntervalStart"
            },
            {
              "text": " - Message : EString",
              "type": "label:text",
              "id": "base/DOCallInfo_Message"
            }
          ]
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-edge",
        "aggregation"
      ],
      "multiplicitySource": "0..1",
      "multiplicityTarget": "0..1",
      "sourceId": "authorization/DOQualifikationenUndBefugnisse",
      "targetId": "authorization/DOMitarbeiterBefugnisListe",
      "type": "edge:aggregation",
      "id": "DOQualifikationenUndBefugnisse_DOMitarbeiterBefugnisListe_MitarbeiterBefugnisListe",
      "children": [
        {
          "text": "MitarbeiterBefugnisListe",
          "type": "label:text",
          "id": "DOQualifikationenUndBefugnisse_DOMitarbeiterBefugnisListe_MitarbeiterBefugnisListe_name"
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-edge",
        "aggregation"
      ],
      "multiplicitySource": "0..1",
      "multiplicityTarget": "0..1",
      "sourceId": "authorization/DOQualifikationenUndBefugnisse",
      "targetId": "authorization/DOMitarbeiterQualifikationListe",
      "type": "edge:aggregation",
      "id": "DOQualifikationenUndBefugnisse_DOMitarbeiterQualifikationListe_MitarbeiterQualifikationListe",
      "children": [
        {
          "text": "MitarbeiterQualifikationListe",
          "type": "label:text",
          "id": "DOQualifikationenUndBefugnisse_DOMitarbeiterQualifikationListe_MitarbeiterQualifikationListe_name"
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-edge",
        "aggregation"
      ],
      "multiplicitySource": "0..1",
      "multiplicityTarget": "0..1",
      "sourceId": "authorization/DOQualifikationenUndBefugnisse",
      "targetId": "authorization/DOQualifikationListe",
      "type": "edge:aggregation",
      "id": "DOQualifikationenUndBefugnisse_DOQualifikationListe_QualifikationListe",
      "children": [
        {
          "text": "QualifikationListe",
          "type": "label:text",
          "id": "DOQualifikationenUndBefugnisse_DOQualifikationListe_QualifikationListe_name"
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-edge",
        "aggregation"
      ],
      "multiplicitySource": "0..1",
      "multiplicityTarget": "0..1",
      "sourceId": "authorization/DOQualifikationenUndBefugnisse",
      "targetId": "authorization/DOZuordnungBefugnisQualifikationListe",
      "type": "edge:aggregation",
      "id": "DOQualifikationenUndBefugnisse_DOZuordnungBefugnisQualifikationListe_ZuordnungBefugnisQualifikationListe",
      "children": [
        {
          "text": "ZuordnungBefugnisQualifikationListe",
          "type": "label:text",
          "id": "DOQualifikationenUndBefugnisse_DOZuordnungBefugnisQualifikationListe_ZuordnungBefugnisQualifikationListe_name"
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "authorization/DOMitarbeiterBefugnisListe",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "authorization/DOMitarbeiterBefugnisListe_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "authorization/DOMitarbeiterBefugnisListe_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "authorization/DOMitarbeiterBefugnisListe_iconlabel"
                }
              ]
            },
            {
              "text": "DOMitarbeiterBefugnisListe",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "authorization/DOMitarbeiterBefugnisListe_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "authorization/DOMitarbeiterBefugnisListe_attrs",
          "children": []
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-edge",
        "aggregation"
      ],
      "multiplicitySource": "0..1",
      "multiplicityTarget": "0..*",
      "sourceId": "authorization/DOMitarbeiterBefugnisListe",
      "targetId": "authorization/DOMitarbeiterBefugnis",
      "type": "edge:aggregation",
      "id": "DOMitarbeiterBefugnisListe_DOMitarbeiterBefugnis_MitarbeiterBefugnis",
      "children": [
        {
          "text": "MitarbeiterBefugnis",
          "type": "label:text",
          "id": "DOMitarbeiterBefugnisListe_DOMitarbeiterBefugnis_MitarbeiterBefugnis_name"
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "authorization/DOQualifikationListe",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "authorization/DOQualifikationListe_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "authorization/DOQualifikationListe_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "authorization/DOQualifikationListe_iconlabel"
                }
              ]
            },
            {
              "text": "DOQualifikationListe",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "authorization/DOQualifikationListe_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "authorization/DOQualifikationListe_attrs",
          "children": []
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-edge",
        "aggregation"
      ],
      "multiplicitySource": "0..1",
      "multiplicityTarget": "0..*",
      "sourceId": "authorization/DOQualifikationListe",
      "targetId": "authorization/DOQualifikation",
      "type": "edge:aggregation",
      "id": "DOQualifikationListe_DOQualifikation_Qualifikation",
      "children": [
        {
          "text": "Qualifikation",
          "type": "label:text",
          "id": "DOQualifikationListe_DOQualifikation_Qualifikation_name"
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "authorization/DOQualifikation",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "authorization/DOQualifikation_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "authorization/DOQualifikation_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "authorization/DOQualifikation_iconlabel"
                }
              ]
            },
            {
              "text": "DOQualifikation",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "authorization/DOQualifikation_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "authorization/DOQualifikation_attrs",
          "children": [
            {
              "text": " - Bezeichnung : EString",
              "type": "label:text",
              "id": "authorization/DOQualifikation_Bezeichnung"
            },
            {
              "text": " - Mandant : EString",
              "type": "label:text",
              "id": "authorization/DOQualifikation_Mandant"
            },
            {
              "text": " - Oid : EString",
              "type": "label:text",
              "id": "authorization/DOQualifikation_Oid"
            },
            {
              "text": " - Qualifikation : EIntegerObject",
              "type": "label:text",
              "id": "authorization/DOQualifikation_Qualifikation"
            },
            {
              "text": " - Sprache : EString",
              "type": "label:text",
              "id": "authorization/DOQualifikation_Sprache"
            }
          ]
        }
      ]
    }
  ]
},"base":{
  "position": null,
  "size": {
    "width": 10000.0,
    "height": 8000.0
  },
  "layoutOptions": null,
  "canvasBounds": {
    "x": -1.0,
    "y": -1.0,
    "width": -1.0,
    "height": -1.0
  },
  "revision": 0,
  "type": "graph",
  "id": "graph",
  "children": [
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "base/DOJournalProperties",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "base/DOJournalProperties_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "base/DOJournalProperties_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "base/DOJournalProperties_iconlabel"
                }
              ]
            },
            {
              "text": "DOJournalProperties",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "base/DOJournalProperties_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "base/DOJournalProperties_attrs",
          "children": []
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-edge",
        "aggregation"
      ],
      "multiplicitySource": "0..1",
      "multiplicityTarget": "0..*",
      "sourceId": "base/DOJournalProperties",
      "targetId": "base/DOJournalProperty",
      "type": "edge:aggregation",
      "id": "DOJournalProperties_DOJournalProperty_JournalProperties",
      "children": [
        {
          "text": "JournalProperties",
          "type": "label:text",
          "id": "DOJournalProperties_DOJournalProperty_JournalProperties_name"
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "base/DOJournalProperty",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "base/DOJournalProperty_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "base/DOJournalProperty_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "base/DOJournalProperty_iconlabel"
                }
              ]
            },
            {
              "text": "DOJournalProperty",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "base/DOJournalProperty_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "base/DOJournalProperty_attrs",
          "children": [
            {
              "text": " - Name : EString",
              "type": "label:text",
              "id": "base/DOJournalProperty_Name"
            },
            {
              "text": " - Source : EString",
              "type": "label:text",
              "id": "base/DOJournalProperty_Source"
            },
            {
              "text": " - Value : EString",
              "type": "label:text",
              "id": "base/DOJournalProperty_Value"
            }
          ]
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "base/DOEMailProperties",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "base/DOEMailProperties_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "base/DOEMailProperties_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "base/DOEMailProperties_iconlabel"
                }
              ]
            },
            {
              "text": "DOEMailProperties",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "base/DOEMailProperties_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "base/DOEMailProperties_attrs",
          "children": []
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-edge",
        "aggregation"
      ],
      "multiplicitySource": "0..1",
      "multiplicityTarget": "0..*",
      "sourceId": "base/DOEMailProperties",
      "targetId": "base/DOEmailProperty",
      "type": "edge:aggregation",
      "id": "DOEMailProperties_DOEmailProperty_EmailProperties",
      "children": [
        {
          "text": "EmailProperties",
          "type": "label:text",
          "id": "DOEMailProperties_DOEmailProperty_EmailProperties_name"
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "base/DOEmailProperty",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "base/DOEmailProperty_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "base/DOEmailProperty_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "base/DOEmailProperty_iconlabel"
                }
              ]
            },
            {
              "text": "DOEmailProperty",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "base/DOEmailProperty_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "base/DOEmailProperty_attrs",
          "children": [
            {
              "text": " - Name : EString",
              "type": "label:text",
              "id": "base/DOEmailProperty_Name"
            },
            {
              "text": " - Source : EString",
              "type": "label:text",
              "id": "base/DOEmailProperty_Source"
            },
            {
              "text": " - Value : EString",
              "type": "label:text",
              "id": "base/DOEmailProperty_Value"
            }
          ]
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "base/DOProp",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "base/DOProp_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "base/DOProp_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "base/DOProp_iconlabel"
                }
              ]
            },
            {
              "text": "DOProp",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "base/DOProp_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "base/DOProp_attrs",
          "children": [
            {
              "text": " - Name : EString",
              "type": "label:text",
              "id": "base/DOProp_Name"
            },
            {
              "text": " - Source : EString",
              "type": "label:text",
              "id": "base/DOProp_Source"
            },
            {
              "text": " - Value : EString",
              "type": "label:text",
              "id": "base/DOProp_Value"
            }
          ]
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "base/DOCallInfo",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "base/DOCallInfo_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "base/DOCallInfo_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "base/DOCallInfo_iconlabel"
                }
              ]
            },
            {
              "text": "DOCallInfo",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "base/DOCallInfo_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "base/DOCallInfo_attrs",
          "children": [
            {
              "text": " - DQL : EString",
              "type": "label:text",
              "id": "base/DOCallInfo_DQL"
            },
            {
              "text": " - ElapTime : ELongObject",
              "type": "label:text",
              "id": "base/DOCallInfo_ElapTime"
            },
            {
              "text": " - IntervalEnd : ELongObject",
              "type": "label:text",
              "id": "base/DOCallInfo_IntervalEnd"
            },
            {
              "text": " - IntervalStart : ELongObject",
              "type": "label:text",
              "id": "base/DOCallInfo_IntervalStart"
            },
            {
              "text": " - Message : EString",
              "type": "label:text",
              "id": "base/DOCallInfo_Message"
            }
          ]
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "base/DOJournaleintrag",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "base/DOJournaleintrag_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "base/DOJournaleintrag_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "base/DOJournaleintrag_iconlabel"
                }
              ]
            },
            {
              "text": "DOJournaleintrag",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "base/DOJournaleintrag_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "base/DOJournaleintrag_attrs",
          "children": [
            {
              "text": " - ActionName : EString",
              "type": "label:text",
              "id": "base/DOJournaleintrag_ActionName"
            },
            {
              "text": " - BusinessKey1 : EString",
              "type": "label:text",
              "id": "base/DOJournaleintrag_BusinessKey1"
            },
            {
              "text": " - BusinessKey2 : EString",
              "type": "label:text",
              "id": "base/DOJournaleintrag_BusinessKey2"
            },
            {
              "text": " - ClientVersion : EString",
              "type": "label:text",
              "id": "base/DOJournaleintrag_ClientVersion"
            },
            {
              "text": " - Duration : EString",
              "type": "label:text",
              "id": "base/DOJournaleintrag_Duration"
            },
            {
              "text": " - EnevtValue1 : EString",
              "type": "label:text",
              "id": "base/DOJournaleintrag_EnevtValue1"
            },
            {
              "text": " - ErrorOccurred : EBooleanObject",
              "type": "label:text",
              "id": "base/DOJournaleintrag_ErrorOccurred"
            },
            {
              "text": " - EventType : EString",
              "type": "label:text",
              "id": "base/DOJournaleintrag_EventType"
            },
            {
              "text": " - EventValue2 : EString",
              "type": "label:text",
              "id": "base/DOJournaleintrag_EventValue2"
            },
            {
              "text": " - EventValue3 : EString",
              "type": "label:text",
              "id": "base/DOJournaleintrag_EventValue3"
            },
            {
              "text": " - Info : EString",
              "type": "label:text",
              "id": "base/DOJournaleintrag_Info"
            },
            {
              "text": " - Origin : EString",
              "type": "label:text",
              "id": "base/DOJournaleintrag_Origin"
            },
            {
              "text": " - ProcessName : EString",
              "type": "label:text",
              "id": "base/DOJournaleintrag_ProcessName"
            },
            {
              "text": " - ServerVersion : EString",
              "type": "label:text",
              "id": "base/DOJournaleintrag_ServerVersion"
            },
            {
              "text": " - TechnicalKey : EString",
              "type": "label:text",
              "id": "base/DOJournaleintrag_TechnicalKey"
            },
            {
              "text": " - User : EString",
              "type": "label:text",
              "id": "base/DOJournaleintrag_User"
            }
          ]
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-edge",
        "aggregation"
      ],
      "multiplicitySource": "0..1",
      "multiplicityTarget": "0..*",
      "sourceId": "base/DOJournaleintrag",
      "targetId": "base/DOJournalData",
      "type": "edge:aggregation",
      "id": "DOJournaleintrag_DOJournalData_JournalData",
      "children": [
        {
          "text": "JournalData",
          "type": "label:text",
          "id": "DOJournaleintrag_DOJournalData_JournalData_name"
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-edge",
        "aggregation"
      ],
      "multiplicitySource": "0..1",
      "multiplicityTarget": "0..1",
      "sourceId": "base/DOJournaleintrag",
      "targetId": "base/DOProps",
      "type": "edge:aggregation",
      "id": "DOJournaleintrag_DOProps_Props",
      "children": [
        {
          "text": "Props",
          "type": "label:text",
          "id": "DOJournaleintrag_DOProps_Props_name"
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "base/DOJournalData",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "base/DOJournalData_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "base/DOJournalData_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "base/DOJournalData_iconlabel"
                }
              ]
            },
            {
              "text": "DOJournalData",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "base/DOJournalData_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "base/DOJournalData_attrs",
          "children": [
            {
              "text": " - Context : EString",
              "type": "label:text",
              "id": "base/DOJournalData_Context"
            },
            {
              "text": " - Exception : EString",
              "type": "label:text",
              "id": "base/DOJournalData_Exception"
            },
            {
              "text": " - ExceptionType : EString",
              "type": "label:text",
              "id": "base/DOJournalData_ExceptionType"
            }
          ]
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "base/DOProps",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "base/DOProps_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "base/DOProps_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "base/DOProps_iconlabel"
                }
              ]
            },
            {
              "text": "DOProps",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "base/DOProps_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "base/DOProps_attrs",
          "children": []
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-edge",
        "aggregation"
      ],
      "multiplicitySource": "0..1",
      "multiplicityTarget": "0..*",
      "sourceId": "base/DOProps",
      "targetId": "base/DOProp",
      "type": "edge:aggregation",
      "id": "DOProps_DOProp_Properties",
      "children": [
        {
          "text": "Properties",
          "type": "label:text",
          "id": "DOProps_DOProp_Properties_name"
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "base/DOProperties",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "base/DOProperties_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "base/DOProperties_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "base/DOProperties_iconlabel"
                }
              ]
            },
            {
              "text": "DOProperties",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "base/DOProperties_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "base/DOProperties_attrs",
          "children": []
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-edge",
        "aggregation"
      ],
      "multiplicitySource": "0..1",
      "multiplicityTarget": "0..*",
      "sourceId": "base/DOProperties",
      "targetId": "base/DOProperty",
      "type": "edge:aggregation",
      "id": "DOProperties_DOProperty_Properties",
      "children": [
        {
          "text": "Properties",
          "type": "label:text",
          "id": "DOProperties_DOProperty_Properties_name"
        }
      ]
    },
    {
      "cssClasses": [
        "ecore-node"
      ],
      "expanded": true,
      "strokeWidth": 0.0,
      "layout": "vbox",
      "position": {
        "x": 0.0,
        "y": 0.0
      },
      "type": "node:class",
      "id": "base/DOProperty",
      "children": [
        {
          "layout": "hbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "type": "comp:header",
          "id": "base/DOProperty_header",
          "children": [
            {
              "layout": "stack",
              "position": {
                "x": 0.0,
                "y": 0.0
              },
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "icon",
              "id": "base/DOProperty_icon",
              "children": [
                {
                  "text": "C",
                  "type": "label:icon",
                  "id": "base/DOProperty_iconlabel"
                }
              ]
            },
            {
              "text": "DOProperty",
              "layoutOptions": {
                "resizeContainer": false,
                "hAlign": "center"
              },
              "type": "label:heading",
              "id": "base/DOProperty_classname"
            }
          ]
        },
        {
          "layout": "vbox",
          "position": {
            "x": 0.0,
            "y": 0.0
          },
          "layoutOptions": {
            "hAlign": "left"
          },
          "type": "comp:comp",
          "id": "base/DOProperty_attrs",
          "children": [
            {
              "text": " - Name : EString",
              "type": "label:text",
              "id": "base/DOProperty_Name"
            },
            {
              "text": " - Source : EString",
              "type": "label:text",
              "id": "base/DOProperty_Source"
            },
            {
              "text": " - Value : EString",
              "type": "label:text",
              "id": "base/DOProperty_Value"
            }
          ]
        }
      ]
    }
  ]
},}