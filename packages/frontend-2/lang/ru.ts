import type { Translations } from './en'

const ru: Translations = {
  auth: {
    login: {
      title: 'Вход в PM Viewer',
      noAccount: 'Нет аккаунта?',
      signUp: 'Зарегистрироваться',
      continueWithSso: 'Войти через SSO',
      email: 'E-mail',
      emailPlaceholder: 'Введите email',
      password: 'Пароль',
      passwordPlaceholder: 'Введите пароль',
      loginButton: 'Войти',
      forgotPassword: 'Забыли пароль?',
      resetPassword: 'Сбросить пароль',
      loginFailed: 'Ошибка входа',
      orSignUpWithEmail: 'Или зарегистрируйтесь по email'
    },
    register: {
      title: 'Создайте аккаунт PM Viewer',
      inviteOnly: 'Сервер только по приглашениям',
      inviteOnlyDescription: 'Если вы получили письмо с приглашением, следуйте инструкциям в нём.',
      alreadyHaveAccount: 'Уже есть аккаунт?',
      logIn: 'Войти',
      workEmail: 'Рабочий email',
      emailPlaceholder: 'Email',
      fullName: 'Полное имя',
      namePlaceholder: 'Моё имя',
      password: 'Пароль',
      passwordPlaceholder: 'Придумайте надёжный пароль',
      signUpButton: 'Зарегистрироваться',
      registrationFailed: 'Ошибка регистрации'
    },
    passwordReset: {
      title: 'Сброс пароля',
      description: 'Введите адрес электронной почты — мы отправим инструкции по сбросу пароля.',
      emailPlaceholder: 'email@example.com',
      sendButton: 'Отправить письмо',
      backToLogin: 'Назад к входу',
      newPassword: 'Пароль',
      newPasswordPlaceholder: 'Новый пароль',
      resetButton: 'Сбросить пароль'
    },
    passwordChecks: {
      minLength: 'Не менее 8 символов',
      oneNumber: 'Одна цифра',
      oneLowercase: 'Одна строчная буква',
      oneUppercase: 'Одна заглавная буква'
    },
    sso: {
      title: 'Вход через SSO — PM Viewer',
      workEmail: 'Рабочий email',
      emailPlaceholder: 'Введите email'
    }
  },
  connectors: {
    banner: {
      title: 'Синхронизация моделей в реальном времени',
      description: 'Обменивайтесь данными между популярными AEC-приложениями с помощью наших коннекторов.'
    }
  },
  viewer: {
    measurements: {
      units: 'Единицы',
      precision: 'Точность',
      chainMeasurements: 'Цепочка измерений',
      snapToVertices: 'Привязка к вершинам',
      deleteAll: 'Удалить все',
      pointToPoint: 'Точка в точку',
      pointToPointDesc: 'Измерение между двумя точками',
      perpendicular: 'Перпендикуляр',
      perpendicularDesc: 'Измерение под углом 90°',
      area: 'Площадь',
      areaDesc: 'Измерение площади между точками',
      pointCoordinates: 'Координаты точки',
      pointCoordinatesDesc: 'Измерение координат XYZ'
    },
    largeDataset: {
      title: 'Предупреждение: большой набор данных',
      uniqueValues: 'уникальных значений.',
      warningText: 'Обработка этого фильтра может вызвать',
      temporarily: 'временную',
      unresponsive: 'зависание браузера.',
      continueQuestion: 'Продолжить?',
      confirm: 'Продолжить'
    }
  },
  project: {
    collaborators: {
      title: 'Участники',
      inviteButton: 'Пригласить в проект',
      generalAccess: 'Общий доступ',
      projectMembers: 'Участники проекта'
    },
    automate: {
      captureTitle: 'Сохраните знания команды',
      captureDesc: 'Превратите неявные знания и монотонные процессы в код. Используйте приватные функции в проектах рабочего пространства.',
      createFunction: 'Создать функцию',
      viewFunctions: 'Просмотр функций',
      automateTitle: 'Автоматизируйте рабочие процессы',
      automateDesc: 'Обеспечьте соответствие данных проекта стандартам, создавайте артефакты и многое другое!',
      createAutomation: 'Создать автоматизацию'
    }
  },
  workspace: {
    moveProject: {
      title: 'Переместите проекты в рабочее пространство:',
      limitReached: 'Достигнут лимит личных проектов',
      federatedError: 'Не удалось загрузить федеративные модели',
      bullet1: 'Создавайте новые проекты и модели,',
      bullet2: 'Приглашайте соавторов проекта,',
      bullet3: 'Просматривайте комментарии и версии старше',
      bullet3Suffix: '(только платные тарифы)',
      versionLimit: 'Версия, которую вы пытаетесь загрузить, старше',
      versionLimitSuffix: 'допустимого лимита истории для личных проектов. Переместите проект в рабочее пространство для получения доступа.',
      federatedLimit: 'Одна из моделей старше',
      federatedLimitSuffix: 'допустимого лимита истории для личных проектов. Переместите проект для получения доступа.',
      notOwner: 'Вы не можете переместить проект, так как не являетесь его владельцем.',
      cancel: 'Отмена',
      loadLatest: 'Загрузить последнюю версию',
      moveProject: 'Переместить проект',
      searchLabel: 'Переместить проекты',
      searchPlaceholder: 'Поиск проектов...',
      moveButton: 'Переместить...',
      noProjects: 'Нет проектов, которые можно переместить в это рабочее пространство. Можно перемещать только проекты, которыми вы владеете и которые не находятся в другом рабочем пространстве.',
      noResults: 'Проекты не найдены.',
      model: 'модель',
      models: 'моделей'
    }
  },
  notifications: {
    title: 'Уведомления',
    empty: 'Нет уведомлений'
  },
  projects: {
    title: 'Проекты',
    search: 'Поиск...',
    newProject: 'Новый проект',
    noProjects: 'Проекты не найдены',
    createFirst: 'Создайте первый проект',
    projectsDescription: 'Проекты — это место, где хранятся ваши модели и их версии.',
    deleteDialog: {
      title: 'Удалить проект',
      confirmIntro: 'Вы уверены, что хотите',
      permanentlyDelete: 'навсегда удалить',
      confirmOutro: 'проект? Это действие',
      cannot: 'нельзя',
      beUndone: 'отменить.',
      typeToConfirm: 'Для подтверждения введите название проекта.',
      projectNameLabel: 'Название проекта',
      projectNamePlaceholder: 'Название проекта...',
      cancel: 'Отмена',
      delete: 'Удалить',
      model: 'модель',
      models: 'моделей',
      version: 'версия',
      versions: 'версий'
    },
    createDialog: {
      chooseWorkspace: 'Выберите рабочее пространство для нового проекта',
      createNew: 'Создать новый проект',
      name: 'Название проекта',
      namePlaceholder: 'Название',
      description: 'Описание проекта',
      descriptionPlaceholder: 'Описание',
      accessPermissions: 'Права доступа',
      back: 'Назад',
      cancel: 'Отмена',
      create: 'Создать'
    }
  },
  header: {
    userMenu: {
      settings: 'Настройки',
      serverSettings: 'Настройки сервера',
      lightMode: 'Светлая тема',
      darkMode: 'Тёмная тема',
      invite: 'Пригласить пользователя',
      logout: 'Выйти',
      login: 'Войти',
      version: 'Версия',
      copySupportReference: 'Скопировать код поддержки'
    }
  },
  dashboard: {
    sidebar: {
      projects: 'Проекты',
      intelligence: 'Аналитика',
      connectors: 'Коннекторы',
      resources: 'Ресурсы',
      feedback: 'Обратная связь',
      tutorials: 'Обучение',
      gettingStarted: 'Начало работы'
    }
  },
  settings: {
    sidebar: {
      exitSettings: 'Выйти из настроек',
      settings: 'Настройки',
      userSettings: 'Настройки пользователя',
      serverSettings: 'Настройки сервера',
      workspaceSettings: 'Настройки рабочего пространства',
      profile: 'Профиль',
      notifications: 'Уведомления',
      developer: 'Разработчик',
      emails: 'Почта',
      general: 'Основные',
      members: 'Участники',
      people: 'Люди',
      projects: 'Проекты',
      regions: 'Регионы',
      automation: 'Автоматизация',
      integrations: 'Интеграции',
      security: 'Безопасность',
      billing: 'Оплата',
      dataResidency: 'Хранение данных'
    },
    profile: {
      title: 'Профиль',
      subtitle: 'Управление профилем',
      userId: 'ID пользователя',
      language: 'Язык интерфейса',
      languageSubtitle: 'Выберите язык интерфейса',
      languageEn: 'English',
      languageRu: 'Русский',
      details: {
        title: 'Ваши данные',
        name: 'Имя',
        namePlaceholder: 'Иван Иванов',
        company: 'Компания',
        companyPlaceholder: 'ООО Пример',
        avatar: 'Аватар',
        avatarSubtitle: 'Загрузите изображение для аватара или используйте инициалы.'
      },
      changePassword: {
        title: 'Смена пароля',
        description: 'Нажмите кнопку ниже, чтобы начать процесс сброса пароля. После нажатия вы получите письмо с инструкциями.',
        resetButton: 'Сбросить пароль'
      },
      deleteAccount: {
        title: 'Удаление аккаунта',
        description: 'Все проекты, где вы являетесь единственным владельцем, и связанные данные будут удалены. Вам потребуется ввести адрес электронной почты и подтвердить удаление.',
        deleteButton: 'Удалить аккаунт'
      }
    },
    notifications: {
      title: 'Уведомления',
      subtitle: 'Настройки уведомлений',
      notificationType: 'Тип уведомления',
      activityDigest: 'Еженедельный дайджест активности',
      mentionedInComment: 'Упоминание в комментарии',
      newStreamAccessRequest: 'Запрос доступа к проекту',
      streamAccessRequestApproved: 'Запрос доступа одобрен',
      unknown: 'Неизвестно'
    },
    developer: {
      title: 'Настройки разработчика',
      subtitle: 'Управление токенами и приложениями',
      exploreGraphQL: 'Обозреватель GraphQL',
      openExplorer: 'Открыть обозреватель',
      accessTokens: {
        title: 'Токены доступа',
        newToken: 'Новый токен',
        description: 'Персональные токены доступа используются для обращения к API сервера; они работают как обычные OAuth-токены. Используйте их в своих скриптах и приложениях!',
        treatAsPassword: 'Обращайтесь с ними как с паролем: не публикуйте их там, где их могут увидеть другие.'
      },
      applications: {
        title: 'Приложения',
        newApplication: 'Новое приложение',
        description: 'Регистрируйте и управляйте сторонними приложениями, которые после авторизации пользователем могут действовать от его имени.'
      },
      authorizedApps: {
        title: 'Авторизованные приложения',
        description: 'Здесь вы можете просмотреть приложения, которым предоставили доступ. Если что-то выглядит подозрительно — отозвите доступ.'
      }
    },
    emails: {
      title: 'Адреса электронной почты',
      subtitle: 'Управление адресами электронной почты',
      yourEmails: 'Ваши адреса',
      addNew: 'Добавить адрес',
      emailAddress: 'Адрес электронной почты',
      emailPlaceholder: 'Адрес электронной почты',
      addButton: 'Добавить'
    },
    server: {
      general: {
        title: 'Основные',
        subtitle: 'Управление настройками сервера',
        serverDetails: 'Данные сервера',
        publicName: 'Публичное имя сервера',
        namePlaceholder: 'Имя сервера',
        description: 'Описание',
        descriptionPlaceholder: 'Описание',
        owner: 'Владелец',
        ownerPlaceholder: 'Владелец',
        adminEmail: 'Email администратора',
        adminEmailPlaceholder: 'Email администратора',
        termsOfService: 'URL пользовательского соглашения',
        inviteOnly: 'Только по приглашениям',
        inviteOnlyDescription: 'Только пользователи с приглашением смогут присоединиться к серверу',
        guestMode: 'Гостевой режим',
        guestModeDescription: "Включает роль 'Гость', которая позволяет пользователям участвовать только в тех проектах, в которые они приглашены",
        saveChanges: 'Сохранить изменения',
        savedSuccess: 'Успешно сохранено',
        savedSuccessDescription: 'Настройки сервера сохранены.',
        saveFailed: 'Ошибка сохранения',
        saveFailedDescription: 'Не удалось обновить данные сервера'
      },
      members: {
        title: 'Участники',
        subtitle: 'Управление участниками сервера',
        membersTab: 'Участники',
        pendingInvites: 'Ожидающие приглашения'
      },
      projects: {
        title: 'Проекты',
        subtitle: 'Управление проектами сервера'
      },
      regions: {
        title: 'Регионы',
        subtitle: 'Управление регионами данных'
      },
      version: 'Версия PM Viewer',
      currentVersion: 'Текущая версия:',
      newVersionAvailable: 'Доступна новая версия',
      upToDate: 'У вас актуальная версия',
      updateTo: 'Обновить до'
    }
  }
}

export default ru
