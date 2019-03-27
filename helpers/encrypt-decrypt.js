const bcrypt = require('bcryptjs');
const salt = 12;

const genSalt = async (salt) => {
    const generatedSalt = await bcrypt.genSalt(salt);
    return generatedSalt;
}

const encrypt = async (data) => {
    const generatedSalt = await genSalt(salt);
    const encryptedData = await bcrypt.hash(data, generatedSalt);
    return encryptedData;
}

const decrypt = async (plaintText, encryptText) => {
    const isMatch = await bcrypt.compare(plaintText, encryptText);
    return isMatch;
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;


