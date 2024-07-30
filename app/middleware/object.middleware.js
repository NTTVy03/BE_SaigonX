const { ObjectTypeManager, ObjectType } = require("../type/enum/ObjectType");
const { ObjectUsecase } = require("../usecase");

const isValidObjectType = (req, res, next) => {
  console.log(">>> isValidObjectType <<<");
  let type = req.params.objectType;
  let objectType = ObjectTypeManager.getObjectType(type.toLowerCase());
  if (objectType === null) {
    return res.status(400).json({ message: "Invalid object type" });
  }

  req.objectType = objectType;
  next();
};

const isObjectTypeCanUpdateResult = (req, res, next) => {
  console.log(">>> isObjectTypeCanUpdateResult <<<");

  let objectType = req.objectType;

  if (objectType === ObjectType.GAME) {
    return res.status(400).json({ message: "Cannot update result for game" });
  }

  next();
};

/**
 * Check if user has access to the object
 *    - First, check valid of object.
 *    - Get Object Detail.
 *    - If checkpoint => check if user open land.
 *    - If land       => check if user open map.
 */
const isAccessObject = async (req, res, next) => {
  console.log(">>> isAccessObject <<<");

  let objectType = req.objectType;
  let objectId = req.params.objectId;
  let userId = req.userId;

  try {
    // Check if user has access to the object
    let asccess = await ObjectUsecase.getObjectAccess(
      objectId,
      objectType,
      userId
    );

    if (!asccess) {
      return res
        .status(403)
        .json({ message: "You do not have access to this object" });
    }

    req.objectResult = asccess;
    next();
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  isValidObjectType,
  isObjectTypeCanUpdateResult,
  isAccessObject,
};
