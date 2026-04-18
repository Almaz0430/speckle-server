const en = {
  auth: {
    login: {
      title: 'ProjectManager login',
      noAccount: "Don't have an account?",
      signUp: 'Sign up',
      continueWithSso: 'Continue with SSO',
      email: 'E-mail',
      emailPlaceholder: 'Enter your email',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      loginButton: 'Log in',
      forgotPassword: 'Forgot your password?',
      resetPassword: 'Reset password',
      loginFailed: 'Login failed',
      orSignUpWithEmail: 'Or sign up with your email'
    },
    register: {
      title: 'Create your ProjectManager account',
      inviteOnly: 'This server is invite only',
      inviteOnlyDescription: 'If you have received an invitation email, please follow the instructions in it.',
      alreadyHaveAccount: 'Already have an account?',
      logIn: 'Log in',
      workEmail: 'Work email',
      emailPlaceholder: 'Email',
      fullName: 'Full name',
      namePlaceholder: 'My name',
      password: 'Password',
      passwordPlaceholder: 'Type a strong password',
      signUpButton: 'Sign up',
      registrationFailed: 'Registration failed'
    },
    passwordReset: {
      title: 'Reset your password',
      description: "Enter your email address and we'll send you the password reset instructions.",
      emailPlaceholder: 'email@example.com',
      sendButton: 'Send reset email',
      backToLogin: 'Back to login',
      newPassword: 'Password',
      newPasswordPlaceholder: 'New password',
      resetButton: 'Reset password'
    },
    passwordChecks: {
      minLength: '8+ characters long',
      oneNumber: 'One number',
      oneLowercase: 'One lowercase letter',
      oneUppercase: 'One uppercase letter'
    },
    sso: {
      title: 'ProjectManager SSO login',
      workEmail: 'Your work email',
      emailPlaceholder: 'Enter your email'
    },
    authorize: {
      title: 'Authorize application',
      heading: 'Authorize application',
      notYou: 'Not you? Switch accounts',
      wantsAccess: 'wants to access your ProjectManager account.',
      appInfo: 'App info & requested permissions',
      author: 'Author:',
      description: 'Description:',
      permissions: 'Permissions:',
      deny: 'Deny',
      authorize: 'Authorize',
      success: 'Success',
      denied: 'Denied',
      error: 'Error',
      connected: 'is connected to your',
      account: 'account.',
      notConnected: 'has not been connected to your',
      couldNotResolve: 'Could not resolve app.',
      goHome: 'Go home',
      redirecting: 'You will be redirected automatically, please wait a moment.',
      malformedResponse: 'Malformed authorization response, please contact site admins.',
      authorizationFailed: 'App authorization failed'
    }
  },
  connectors: {
    banner: {
      title: 'Sync models in real time',
      description: 'Extract and exchange data between the most popular AEC applications using our tailored connectors.'
    }
  },
  viewer: {
    measurements: {
      units: 'Units',
      precision: 'Precision',
      chainMeasurements: 'Chain measurements',
      snapToVertices: 'Snap to vertices',
      deleteAll: 'Delete all',
      pointToPoint: 'Point to Point',
      pointToPointDesc: 'Measure between two points',
      perpendicular: 'Perpendicular',
      perpendicularDesc: 'Measure at a 90° angle',
      area: 'Area',
      areaDesc: 'Measure area between points',
      pointCoordinates: 'Point coordinates',
      pointCoordinatesDesc: 'Measure XYZ coordinates'
    },
    largeDataset: {
      title: 'Large Dataset Warning',
      uniqueValues: 'unique values.',
      warningText: 'Processing this filter may cause your browser to become',
      temporarily: 'temporarily',
      unresponsive: 'unresponsive.',
      continueQuestion: 'Do you want to continue?',
      confirm: 'Continue'
    },
    controls: {
      measure: 'Measure',
      section: 'Section',
      explode: 'Explode',
      viewModes: 'View modes',
      lightControls: 'Light controls',
      models: 'Models',
      filters: 'Filters',
      discussions: 'Discussions',
      savedViews: 'Saved views',
      devMode: 'Dev mode',
      documentation: 'Documentation',
      help: 'Get help',
      cameraControls: 'Camera controls',
      reset: 'Reset',
      done: 'Done'
    },
    embed: {
      updated: 'Updated',
      created: 'Created',
      multipleModels: 'Multiple models'
    },
    panels: {
      models: 'Models',
      detachedObject: 'Detached object',
      detachedObjects: 'Detached objects',
      noModelsLoaded: 'No models loaded, yet.',
      addModel: 'Add model',
      filters: 'Filters',
      resetFilters: 'Reset',
      addFilter: 'Add filter',
      addNewFilter: 'Add new filter',
      results: '{count} result | {count} results',
      discussions: 'Discussions',
      showIn3DModel: 'Show in 3D model',
      showResolved: 'Show resolved ({count})',
      excludeOtherVersions: 'Exclude threads from other versions',
      loadedVersionsOnly: 'Loaded versions only',
      noFilters: 'There are no filters, yet.',
      byModel: 'By model',
      byObjectUrl: 'By object URL',
      modelAdded: 'Model added successfully',
      zoomToFit: 'Zoom to fit'
    }
  },
  project: {
    collaborators: {
      title: 'Collaborators',
      inviteButton: 'Invite to project',
      generalAccess: 'General access',
      projectMembers: 'Project members'
    },
    automate: {
      captureTitle: "Capture your team's knowledge",
      captureDesc: 'Turn tacit knowledge and monotonous process into code. Use private functions across projects in your workspace.',
      createFunction: 'Create function',
      viewFunctions: 'View functions',
      automateTitle: 'Automate your workflows',
      automateDesc: 'Continuously ensure project data standards, generate delivery artifacts, and more!',
      createAutomation: 'Create automation'
    }
  },
  workspace: {
    moveProject: {
      title: 'Move your projects to a workspace to:',
      limitReached: 'Personal projects limit reached',
      federatedError: "The federated models couldn't be loaded",
      bullet1: 'Create new projects and models,',
      bullet2: 'Invite new project collaborators,',
      bullet3: 'View comments and versions older than',
      bullet3Suffix: '(paid plans only)',
      versionLimit: "The version you're trying to load is older than the",
      versionLimitSuffix: 'version history limit allowed for Personal projects. Move your project to a workspace to gain access.',
      federatedLimit: 'One of the models is older than the',
      federatedLimitSuffix: 'version history limit allowed for Personal projects. Move your project to a workspace to gain access.',
      notOwner: "You can't move the project because you're not a project owner.",
      cancel: 'Cancel',
      loadLatest: 'Load latest version',
      moveProject: 'Move project',
      searchLabel: 'Move projects',
      searchPlaceholder: 'Search projects...',
      moveButton: 'Move...',
      noProjects: "You don't have any projects that can be moved into this workspace. Only projects you own and that aren't in another workspace can be moved.",
      noResults: 'No projects match your search.',
      model: 'model',
      models: 'models'
    }
  },
  notifications: {
    title: 'Notifications',
    empty: 'No notifications'
  },
  projects: {
    title: 'Projects',
    search: 'Search...',
    newProject: 'New project',
    noProjects: 'No projects found',
    createFirst: 'Create your first project',
    projectsDescription: 'Projects are the place where your models and their versions live.',
    filters: {
      projectsToMove: 'Projects to move'
    },
    deleteDialog: {
      title: 'Delete project',
      confirmIntro: 'Are you sure you want to',
      permanentlyDelete: 'permanently delete',
      confirmOutro: 'project? This action',
      cannot: 'cannot',
      beUndone: 'be undone.',
      typeToConfirm: 'To confirm, type the project name below.',
      projectNameLabel: 'Project name',
      projectNamePlaceholder: 'Project name...',
      cancel: 'Cancel',
      delete: 'Delete',
      model: 'model',
      models: 'models',
      version: 'version',
      versions: 'versions'
    },
    createDialog: {
      chooseWorkspace: 'Choose workspace for a new project',
      createNew: 'Create a new project',
      name: 'Project name',
      namePlaceholder: 'Name',
      description: 'Project description',
      descriptionPlaceholder: 'Description',
      accessPermissions: 'Access permissions',
      back: 'Back',
      cancel: 'Cancel',
      create: 'Create'
    },
    card: {
      readyToMove: 'Ready to move',
      updated: 'Updated',
      ownerCanMove: 'As the project owner you can move this project to a workspace',
      onlyOwnerCanMove: 'Only the project owner can move this project into a workspace',
      moveProject: 'Move project',
      viewPricing: 'View pricing',
      modelCount: '{count} model | {count} models',
      created: 'Created'
    },
    moveToWorkspace: {
      bannerTitleProject: 'Move this project to a workspace',
      bannerTitleProjects: 'Move your projects to a workspace',
      description: 'Personal projects are being phased out. Move your projects to a workspace to create new projects and models, invite new project collaborators, and view comments and versions older than 7 days. By January 1st 2026, all projects will be deleted if not moved into a workspace.',
      onlyOwnerTooltip: 'Only the project owner can move this project into a workspace',
      moveProject: 'Move project',
      moveProjects: 'Move projects'
    },
    addDialog: {
      workspaceSubheading: 'New projects can only be created within a workspace.',
      createWorkspace: 'Create a new workspace'
    },
    hiddenProjects: {
      title: '{count} project is hidden | {count} projects are hidden',
      description: 'in SSO-protected workspaces. To view {pronoun}, authenticate with:'
    }
  },
  header: {
    userMenu: {
      settings: 'Settings',
      serverSettings: 'Server settings',
      lightMode: 'Light mode',
      darkMode: 'Dark mode',
      invite: 'Invite a user',
      logout: 'Log out',
      login: 'Log in',
      version: 'Version',
      copySupportReference: 'Copy support reference'
    }
  },
  dashboard: {
    sidebar: {
      projects: 'Projects',
      intelligence: 'Intelligence',
      connectors: 'Connectors',
      resources: 'Resources',
      feedback: 'Give us feedback',
      tutorials: 'Tutorials',
      gettingStarted: 'Getting started'
    }
  },
  settings: {
    sidebar: {
      exitSettings: 'Exit settings',
      settings: 'Settings',
      userSettings: 'User settings',
      serverSettings: 'Server settings',
      workspaceSettings: 'Workspace settings',
      profile: 'Profile',
      notifications: 'Notifications',
      developer: 'Developer',
      emails: 'Emails',
      general: 'General',
      members: 'Members',
      people: 'People',
      projects: 'Projects',
      regions: 'Regions',
      automation: 'Automation',
      integrations: 'Integrations',
      security: 'Security',
      billing: 'Billing',
      dataResidency: 'Data residency'
    },
    profile: {
      title: 'Profile',
      subtitle: 'Manage your profile',
      userId: 'User ID',
      language: 'Language',
      languageSubtitle: 'Choose your preferred interface language',
      languageEn: 'English',
      languageRu: 'Russian',
      details: {
        title: 'Your details',
        name: 'Name',
        namePlaceholder: 'John Doe',
        company: 'Company',
        companyPlaceholder: 'Example Ltd.',
        avatar: 'Avatar',
        avatarSubtitle: 'Upload your profile avatar image or use your initials.'
      },
      changePassword: {
        title: 'Password change',
        description: 'Press the button below to start the password reset process. Once pressed, you will receive an e-mail with further instructions.',
        resetButton: 'Reset password'
      },
      deleteAccount: {
        title: 'Delete account',
        description: 'We will delete all projects where you are the sole owner, and any associated data. We will ask you to type in your email address and press the delete button.',
        deleteButton: 'Delete account'
      }
    },
    notifications: {
      title: 'Notifications',
      subtitle: 'Your notification preferences',
      notificationType: 'Notification type',
      activityDigest: 'Weekly activity digest',
      mentionedInComment: 'Mentioned in comment',
      newStreamAccessRequest: 'Project access request',
      streamAccessRequestApproved: 'Project access request approved',
      unknown: 'Unknown'
    },
    developer: {
      title: 'Developer settings',
      subtitle: 'Manage your tokens and authorized apps',
      exploreGraphQL: 'Explore GraphQL',
      openExplorer: 'Open explorer',
      accessTokens: {
        title: 'Access tokens',
        newToken: 'New token',
        description: 'Personal Access Tokens can be used to access the API on this server; they function like ordinary OAuth access tokens. Use them in your scripts or apps!',
        treatAsPassword: 'Treat them like a password: do not post them anywhere where they could be seen by others.'
      },
      applications: {
        title: 'Applications',
        newApplication: 'New application',
        description: 'Register and manage third-party Apps that, once authorised by a user on this server, can act on their behalf.'
      },
      authorizedApps: {
        title: 'Authorized Apps',
        description: 'Here you can review the apps that you have granted access to. If something looks suspicious, revoke the access.'
      }
    },
    emails: {
      title: 'Email addresses',
      subtitle: 'Manage your email addresses',
      yourEmails: 'Your emails',
      addNew: 'Add new email',
      emailAddress: 'Email address',
      emailPlaceholder: 'Email address',
      addButton: 'Add'
    },
    server: {
      general: {
        title: 'General',
        subtitle: 'Manage your server settings',
        serverDetails: 'Server details',
        publicName: 'Server public name',
        namePlaceholder: 'Server name',
        description: 'Description',
        descriptionPlaceholder: 'Description',
        owner: 'Owner',
        ownerPlaceholder: 'Owner',
        adminEmail: 'Admin email',
        adminEmailPlaceholder: 'Admin email',
        termsOfService: 'URL to the Terms of Service',
        inviteOnly: 'Invite only mode',
        inviteOnlyDescription: 'Only users with an invitation will be able to join the server',
        guestMode: 'Guest mode',
        guestModeDescription: "Enables the 'Guest' server role, which allows users to only contribute to projects that they're invited to",
        saveChanges: 'Save changes',
        savedSuccess: 'Successfully saved',
        savedSuccessDescription: 'Your server settings have been saved.',
        saveFailed: 'Saving failed',
        saveFailedDescription: 'Failed to update server info'
      },
      members: {
        title: 'Members',
        subtitle: 'Manage members on your server',
        membersTab: 'Members',
        pendingInvites: 'Pending invites'
      },
      projects: {
        title: 'Projects',
        subtitle: 'Manage projects on your server'
      },
      regions: {
        title: 'Regions',
        subtitle: 'Manage data regions'
      },
      version: 'ProjectManager Version',
      currentVersion: 'Current version:',
      newVersionAvailable: 'New version available',
      upToDate: 'You are up to date',
      updateTo: 'Update to'
    }
  }
}

export default en
export type Translations = typeof en
