// 统一校验
interface CommonRules {
  email: RegExp;
  phone: RegExp;
}

const commonRules: CommonRules = {
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  phone: /^1[3456789]\d{9}$/
};

const validator = (value: string, type: keyof CommonRules) => {
  return commonRules[type].test(value);
};

export { commonRules, validator };
