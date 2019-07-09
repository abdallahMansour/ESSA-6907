import ProjectDetails from 'pages/ProjectDetails/Loadable'
import Graphnos from 'pages/Graphnos/Loadable'
import Issues from 'pages/Issues/Loadable'
import SelectTree from 'pages/SelectTree/Loadable'
import Dashboard from 'pages/Dashboard/Loadable'
import SprintBoard from 'pages/SprintBoard/Loadable'
import Editor from 'pages/Editor/Loadable'
import Commits from 'pages/Commits/Loadable'
import ConnectLanding from 'pages/ConnectLanding'
import ConnectEntreprise from 'pages/ConnectEntreprise'
import ConnectDeveloper from 'pages/ConnectDeveloper'
import ConnectSuccess from 'pages/ConnectSuccess'
import StudentList from 'pages/StudentList'

export default {
  ROOT: {
    path: '/',
  },
  DASHBOARD: {
    path: '/dashboard',
    component: Dashboard,
  },
  PROJECT_DETAILS: {
    path: '/project-details/:projectId',
    linkPath: id => `/project-details/${id}`,
    component: ProjectDetails,
  },
  GRAPHNOS: {
    path: '/graphnos/',
    linkPath: page => `/graphnos/${page}`,
    component: Graphnos,
    children: {
      skillNetwork: 'skill-network',
      transform: 'transform',
      traversal: (id = ':nodeId') => `traversal/${id}`,
    },
  },
  ISSUES: {
    path: '/issues/',
    component: Issues,
  },
  TREE: {
    path: '/tree/',
    component: SelectTree,
  },
  SPRINT_BOARD: {
    path: '/sprint-board/:projectId',
    linkPath: id => `/sprint-board/${id}`,
    component: SprintBoard,
  },
  EDITOR: {
    path: '/editor/:skillId',
    linkPath: id => `/editor/${id}`,
    component: Editor,
  },
  COMMITS: {
    path: '/commits',
    component: Commits,
  },
  CONNECT: {
    path: '/connect',
    component: ConnectLanding,
  },
  ENTREPRISE: {
    path: '/entreprise',
    component: ConnectEntreprise,
  },
  DEVELOPER: {
    path: '/developer',
    component: ConnectDeveloper,
  },
  SUCCESS: {
    path: '/success',
    component: ConnectSuccess,
  },
  STUDENTS: {
    path: '/students',
    component: StudentList,
  },
}
