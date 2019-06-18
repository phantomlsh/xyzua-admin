var MODELS = {
  tables: ["app", "user", "ticket", "mark", "code"],
  defaultFields: [],
};

MODELS.defaultFields['app'] = "Id,Appname"
MODELS.defaultFields['user'] = "Id,Username"
MODELS.defaultFields['ticket'] = "Id,Ticket"
MODELS.defaultFields['mark'] = "Id,Identity,Type"
MODELS.defaultFields['code'] = "Id,Appid,Userid"

export default MODELS