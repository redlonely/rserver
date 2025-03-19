// 校验空值
export const isEmpty = (value: any): boolean => {
    return value === null || value === undefined || value === '';
};

// 校验对象值是否为空
export const isValuesEmpty = (obj: object): boolean => {
    return Object.values(obj).some((value) => isEmpty(value));
};

// 校验邮箱
export const isEmail = (email: string): boolean => {
    const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    return reg.test(email);
};

// 校验手机号
export const isPhone = (phone: string): boolean => {
    const reg = /^1[3456789]\d{9}$/;
    return reg.test(phone);
};

// 校验密码
export const isPassword = (password: string): boolean => {
    const reg = /^[a-zA-Z0-9]{6,20}$/;
    return reg.test(password);
};
