// config of model

var MODEL = {
  tables: ["app", "user", "ticket", "mark", "code"],
  defaultFields: [],
  keys: [],
  type: [],
  addParams: function() {
    return {
      admintoken: window.localStorage['XYZUA_Token']
    }
  }
};

MODEL.defaultFields['app'] = "Id,Appname"
MODEL.defaultFields['user'] = "Id,Username"
MODEL.defaultFields['ticket'] = "Id,Tag"
MODEL.defaultFields['mark'] = "Id,Identity,Type"
MODEL.defaultFields['code'] = "Id,Appid,Userid"

MODEL.keys['app'] = ['Id', 'Appname', 'Secret', 'Callback']
MODEL.keys['user'] = ['Id', 'Username', 'Password', 'Info', 'Role', 'Authority', 'Token', 'Expire']
MODEL.keys['ticket'] = ['Id', 'Ticket', 'Tag', 'Info', 'Expire']
MODEL.keys['mark'] = ['Id', 'Type', 'Identity', 'Timestamp']
MODEL.keys['code'] = ['Id', 'Userid', 'Appid', 'Code', 'Expire']

MODEL.type['app'] = {
  Id: 'int',
  Appname: 'string',
  Secret: 'random(64)',
  Callback: 'string'
}
MODEL.type['user'] = {
  Id: 'int',
  Username: 'string',
  Password: 'password',
  Info: 'json',
  Role: 'string',
  Authority: 'int',
  Token: 'random(32)',
  Expire: 'time'
}
MODEL.type['ticket'] = {
  Id: 'int',
  Ticket: 'random(20)',
  Tag: 'string',
  Info: 'json',
  Expire: 'time'
}
MODEL.type['mark'] = {
  Id: 'int',
  Type: 'string',
  Identity: 'string',
  Timestamp: 'disable'
}
MODEL.type['app'] = {
  Id: 'int',
  Appname: 'string',
  Secret: 'random(64)',
  Callback: 'string'
}
MODEL.type['code'] = {
  Id: 'int',
  Userid: 'int',
  Appid: 'int',
  Code: 'random(64)',
  Expire: 'time'
}

export default MODEL