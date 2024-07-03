// @TODO: Nhớ Review
// [N] A - [N] B (Through entityIntersection)
const create_N_N_accosiation = (entityA, entityB, entityIntersection) => {
  entityA.belongsToMany(entityB, { through: entityIntersection });
  entityB.belongsToMany(entityA, { through: entityIntersection });

  entityA.hasMany(entityIntersection);
  entityIntersection.belongsTo(entityA);

  entityB.hasMany(entityIntersection);
  entityIntersection.belongsTo(entityB);
}
// @TODO: Nhớ Review
// [1] entity1 -- [N] entityN 
// (Lấy ID/khóa chính của entity1) làm foreign key cho entityN
const create_1_N_accosiation = (entity1, entityN, foreignKey, allowNull = false) => {
  entity1.hasMany(entityN, {
    foreignKey: {
      name: foreignKey,
      allowNull
    }
  });
  entityN.belongsTo(entity1, {
    foreignKey: foreignKey
  });
}
// @TODO: Nhớ Review
// [1] entity1 -- [1] entity2 (entity1 có trước)
// Lấy ID/khóa chính của entity1 làm foreign key cho entity2
const create_1_1_accosiation = (entity1, entity2, foreignKey='id', allowNull=false) => {
  entity1.hasOne(entity2, {
    foreignKey: {
      name: foreignKey,
      allowNull
    }
  });
  entity2.belongsTo(entity1, {
    foreignKey: foreignKey
  });
}

module.exports = {
  create_N_N_accosiation,
  create_1_N_accosiation,
  create_1_1_accosiation
}