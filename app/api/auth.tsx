const user_email = "m"; // 확인할때는 간단하게 적기 다 적기 귀찮어
const user_password = "m";

const signIn = (email: string, password: string) => {
  // input창에서 email과 password를 받을것임
  return new Promise((resolve, reject) => {
    // 결과값 받는것과 에러메세지 받는 변수
    setTimeout(() => {
      if (email == user_email && password == user_password) {
        resolve(email); // 로그인 성공하면 사용자 이메일 전달
      } else {
        reject("이메일 혹은 비밀번호가 올바르지 않습니다.");
      }
    }, 1000); // 1초동안 시간 끄는것, 로그인 실패하면 1초 뒤에 로그인실패 창이 뜨는듯??
  });
};

export default signIn;
