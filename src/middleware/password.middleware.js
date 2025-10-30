import bcrypt from "bcrypt";

export async function hashPasswordBeforeSave(next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
}

export async function hashPasswordBeforeUpdate(next) {
  const update = this.getUpdate();

  if (!update?.password) return next();

  try {
    update.password = await bcrypt.hash(update.password, 10);
    next();
  } catch (error) {
    next(error);
  }
}

export async function comparePasswords(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
