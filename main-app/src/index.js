const getMath = async () => {
  const math = await import("remoteApp/math");
  console.log("remote:", math.addPlus([1, 2]));
};

const getLocalAdd = async () => {
  const add = await import("add");
  console.log("main:", add.default([1, 2]));
};

getMath();
getLocalAdd();
