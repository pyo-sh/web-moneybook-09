<div align="center">
  <a href="https://github.com/woowa-techcamp-2022/web-moneybook-09">
    <img src="https://user-images.githubusercontent.com/78121870/182010905-284cf433-a58f-439f-b70f-ff2052db2b85.png" alt="Logo">
  </a>



  <p align="center">
    수입과 지출을 관리하는  웹용 가계부
    <br />
    <a href="https://chrome-submarine-cd8.notion.site/TO-DO-LIST-538d7f9110cc414087668e675a10b257">
      <strong>  
        Notion Docs (노션 url 변경 필요)
      </strong>
    </a>
  </p>
</div>

<table align="center">
  <tr>
    <td>
      <a href="https://github.com/youngkyo0504">
        <img src="https://avatars.githubusercontent.com/youngkyo0504" width="100"/>
      </a>
    </td>
    <td>
      <a href="https://github.com/pyo-sh">
        <img src="https://avatars.githubusercontent.com/pyo-sh" width="100"/>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/youngkyo0504">
        <strong>
          금교영
        </strong>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/pyo-sh">
        <strong>
          표석훈
        </strong>
      </a>
    </td>
  </tr>
</table>

## Built With

### Back-End 개발

- NodeJS 기반의 Express 사용
- 데이터 베이스로 MySQL 사용
- Public 폴더를 통해 Front-End 파일 제공 (index.html)

### Front-End 개발

- Babel을 통해 호환성 높은 코드 제공
- Webpack을 통해 일관성 있는 개발 시도
- webpack dev, webpack prod 환경을 나누어 개발 시도 

<br />
<br />

### Prerequisites

nodeJS, npm 사용 가능한 상태에서 의존 라이브러리들을 받습니다.

```sh
npm install
```

### Run & Deploy

1. Express 서버에서 해당 환경 변수를 사용하며, dotenv를 통해 제공하고 있습니다.
   `rootDirectory`에 `.env` 파일을 생성하여 아래의 내용을 기입합니다.
   
   ```
   PORT = {Express 구동 Port}
   DB_HOST = {MySQL Host}
   DB_USER = {Database User}
   DB_PASSWORD = {MySQL User Password}
   DB_PORT = {MySQL Port}
   DB_NAME = {Database Name}
   ```
2. 개발을 진행할 때는 dev server를 실행합니다.

    ```sh
    # server dev모드 시작 
    npm run server:dev

    # client dev모드 시작 
    npm run client:dev

    # 동시에 시작 
    npm run dev
    ```
 3. 서버에서 DataBase 연결 Log 들이 모두 완료되었다는  뜨면 성공입니다.
 
     ```
    PAYMENT_METHOD TABLE CHECK...
    PAYMENT_METHOD TABLE CHECKED!
    CATEGORY TABLE CHECK...
    CATEGORY TABLE CHECKED!
    HISTORY TABLE CHECK...
    HISTORY TABLE CHECKED!
    ALL TABLE CHECKED!
     ```
4. production모드를 진행할 때는 Express 서버에서 Front-End 화면의 index.html을 Public으로 제공해야합니다. 
   webpack으로 `./server/public` 위치에 번들링을 먼저 해야합니다.  
   
   ```sh
   # webpack production모드로 번들링 
   npm run build
   
   # 서버 실행 
   npm run server:start
   ```
5. 클라우드 환경에서 배포를 진행할 때는 다음과 같은 명령어를 사용합니다. (pm2설치 필요)

   ```sh
   npm run deploy
   ```

<br />
<br />
<!-- 
## UIs (현재까지 구현 된)

### 메인 화면

현재 DB에 저장되어 있는 목록들이 전부 불러와집니다.

<img width="820" alt="image" src="https://user-images.githubusercontent.com/55688122/179220905-c5e42bab-198a-41a4-9a3d-c12e058fa455.png">

### 히스토리(로그)

작업했던 내용을 로그 형식으로 저장하여 사용자에게 보여줍니다.

<img width="820" alt="image" src="https://user-images.githubusercontent.com/55688122/179221095-7bb694a1-51d5-4d8f-8e34-da6e19512db0.png">

### 추가 구현

카드를 추가할 수 있습니다.

- 추가 후 DOM 에 추가하는 작업은 아직 안됐습니다.
- Teaxarea 과정 중 Space 를 `<br/>`로 변경해야 합니다.

|                                                                  추가 전                                                                  |                                                                  추가 후                                                                  |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="390" alt="image" src="https://user-images.githubusercontent.com/55688122/179223261-10ba5da7-104b-42f2-81bc-3db35ee80d8d.png"> | <img width="390" alt="image" src="https://user-images.githubusercontent.com/55688122/179223377-85bce62d-7157-4b45-810a-1d4de35fa5b1.png"> |

### 삭제 구현

카드를 삭제할 수 있습니다.

|                                                                  삭제 전                                                                  |                                                                마우스 오버                                                                |                                                                  삭제 후                                                                  |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="266" alt="image" src="https://user-images.githubusercontent.com/55688122/179222095-2019cd3c-aa02-401e-ac23-090eca5d64ee.png"> | <img width="266" alt="image" src="https://user-images.githubusercontent.com/55688122/179222188-62544900-abca-4494-97b7-aa89bb48fe3d.png"> | <img width="266" alt="image" src="https://user-images.githubusercontent.com/55688122/179222276-26644614-dd46-4fc9-8a60-b182384c6418.png"> |

### Drag and Drop

현재 DB와 연동된 상태는 아닙니다.

- 이후 Column간의 이동과 정렬을 DB 저장하는 구현이 필요합니다.

<img width="820" alt="image" src="https://user-images.githubusercontent.com/55688122/179222716-f160542b-c668-4eb7-beb5-ba61d69b61d8.png">

<br />
<br />

## How's The Project?

Point:

- 설계 및 기획을 열심히 문서화하여 진행해보자.
- 컨벤션을 자세하게 설정하여 개발 도중 Process 질문을 줄여보자.
- 구조를 확립하여 서로의 코드를 잘 확인할 수 있도록 하자.
- 서로의 코드, 방식, 생각에 질문 및 의견 표출을 열심히 하자.
 -->
