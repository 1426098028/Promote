import { ref, Ref } from 'vue';
import { Encrypt, Decrypt } from '@/utils/aes';
const useMemoPassWord = (ruleForm) => {
    const getUserPwd = (): UserRuleFrom => {
        let UserAccountStorage: string | null = localStorage.getItem('user-pwd');
        return UserAccountStorage ? JSON.parse(Decrypt(UserAccountStorage)) : { username: '', password: '', IsPassWord: false };
    };
    const IsPassWord = ref<Ref>(getUserPwd().IsPassWord);
    const onMemoPassWord = (value) => {
        IsPassWord.value = value;
        if (!value) return localStorage.removeItem('user-pwd');
        const UserAccount = { ...ruleForm, IsPassWord: value };
        delete UserAccount.key;
        delete UserAccount.captcha;
        const UserAccountEncrypt = Encrypt(JSON.stringify(UserAccount));
        localStorage.setItem('user-pwd', UserAccountEncrypt);
    };
    return { IsPassWord, onMemoPassWord, getUserPwd };
};
export default useMemoPassWord; 
