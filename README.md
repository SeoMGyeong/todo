# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

타입스크립트의 타입 종류

1. string : 문자형
   function (a:string,b:string) :string {
   return a+b;
   // a와 b의 문자열 연결되어서 나옴(추가)
   }
   // a,b는 매개변수. :type지정/ 괄호 안에서 바로 뒤에 적을때는 매개변수 하나에 한해 문자형
   괄호 밖에서 :string이라고 하면 함수 전체에 있어서 반환되는 값이 문자형이라는 뜻

2. number : 숫자형
   function (a:number,b:number) :number {
   return a + b;
   // 더해져서 나옴 (연산)
   }

3. boolean : 참 또는 거짓
   id:string,
   task:string,
   isDone:boolean,
   {id:"1", task:"할일내용", isDone:false}

4. object
   중괄호로 감싸져있으며 중괄호 안에 key와 값으로 여러가지 타입으로 섞여있음
   object는 별명을 지어줌

type Props = { (Props가 별명인듯?)
id:string;
task:string;
isDone:boolean;
} //각각의 요소들에 대해 타입을 따로 지정
타입이 여러가지가 섞여있기때문에 한번에 선언 불가
object중에서 필수 항목이 아닌것도 있음. -> 물음표 붙여주기
예) isDone?:boolean
todos = {id:"1", task:"할일내용", isDone:false} : Props
---그러면
파일명.propTypes = {
object명: PropTypes.string,
// 이것도 object인것인가
}

// 이렇게도 사용 가능
interface Props { (등호 안들어감, 확장 가능)
id:string;
task:string;
isDone:boolean;
}

(확장)
interface prop extends Props {
keyboardType?:string
}
// 위의 3가지와 아래의 keyboardType 사용 가능

todos = {id:"1", task:"할일내용", isDone:false} : Props

☆ interface로 쓸거면 tsconfig.json 파일의 target을 "ES6"으로 해줘야함

5. Array : 배열 1)문자형 배열
   test:Array<string> = ["1", "2", "3"];
   test:string[] = ["1", "2", "3"];

2) 숫자형 배열
   test:Array<number> = [1, 2, 3];
   test:number[] = [1, 2, 3];

3) 불린형 배열 (안에 순수하게 불리언만 들어갔을 경우에만 사용 가능)
   test:Array<boolean> = [true, false, true];
   test:boolean[] = [true, false, true];

- test:any[] = ["1", false, 3];
  any는 모든 데이터 타입 허용 가능

4. union형 배열 (딱 지정이 되어있음-고정되어있다)
   test:(string|number)[] = ["1", 2]
   string|number로 줬기 때문에 앞에는 문자, 뒤에는 숫자. 그리고 2개밖에 없기 때문에 배열 크기는 2임
   순서랑 type, 배열 크기 지켜줘야함
   test:[string,number] = ["1", 2]

6) null 형
   test:null = ""; -비어있다

7) undefined 형
   test:undefined = "";
   test:string|undefined ="", / string으로 받거나 아니면 아직 정의되어있지않던가 -정의되어있지않다

8) Never형
   오류를 알려주기 위한 타입

9) 함수형
   () => void; (반환되는 값 없을때)
   (str:string) => void; (string으로 받아서...? )
   (num:number) => number; (넘버로 받아서 넘버로 반환)

------------------- 새로운 프로젝트 생성 ------------------
\_layout.tsx에 있는
Stack.Screen name은 파일명을 적어주면 됨
