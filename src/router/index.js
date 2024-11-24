import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DKeyLesson from '../views/lessons/HomeRow/DKeyLesson.vue'
import FKeyLesson from '../views/lessons/HomeRow/FKeyLesson.vue'
import SKeyLesson from '../views/lessons/HomeRow/SKeyLesson.vue'
import AKeyLesson from '../views/lessons/HomeRow/AKeyLesson.vue'
import SemicolonKeyLesson from '../views/lessons/HomeRow/SemicolonKeyLesson.vue'
import LKeyLesson from '../views/lessons/HomeRow/LKeyLesson.vue'
import JKeyLesson from '../views/lessons/HomeRow/JKeyLesson.vue'
import KKeyLesson from '../views/lessons/HomeRow/KKeyLesson.vue'
import GKeyLesson from '../views/lessons/HomeRow/GKeyLesson.vue'
import GHKeyLesson from '../views/lessons/HomeRow/GHKeyLesson.vue'
import HKeyLesson from '../views/lessons/HomeRow/HKeyLesson.vue'
import GHJKeyLesson from '../views/lessons/HomeRow/GHJKeyLesson.vue'
import HomeKeyLesson from '../views/lessons/HomeRow/HomeKeyLesson.vue'
import HRwordLesson from '../views/lessons/HomeRow/HRwordLesson.vue'


import TKeyLesson from '../views/lessons/TopRow/TKeyLesson.vue'
import RKeyLesson from '../views/lessons/TopRow/RKeyLesson.vue'
import EKeyLesson from '../views/lessons/TopRow/EKeyLesson.vue'
import WKeyLesson from '../views/lessons/TopRow/WKeyLesson.vue'
import QKeyLesson from '../views/lessons/TopRow/QKeyLesson.vue'
import PKeyLesson from '../views/lessons/TopRow/PKeyLesson.vue'
import OKeyLesson from '../views/lessons/TopRow/OKeyLesson.vue'
import IKeyLesson from '../views/lessons/TopRow/IKeyLesson.vue'
import UKeyLesson from '../views/lessons/TopRow/UKeyLesson.vue'
import YKeyLesson from '../views/lessons/TopRow/YKeyLesson.vue'
import TYKeyLesson from '../views/lessons/TopRow/TYKeyLesson.vue'
import TYUKeyLesson from '../views/lessons/TopRow/TYUKeyLesson.vue'
import TopKeyLesson from '../views/lessons/TopRow/TopKeyLesson.vue'
import TRwordLesson from '../views/lessons/TopRow/TRwordLesson.vue'

import BKeyLesson from '../views/lessons/BottomRow/BKeyLesson.vue'
import VKeyLesson from '../views/lessons/BottomRow/VKeyLesson.vue'


import CKeyLesson from '../views/lessons/BottomRow/CKeyLesson.vue'
import XKeyLesson from '../views/lessons/BottomRow/XKeyLesson.vue'
import ZKeyLesson from '../views/lessons/BottomRow/ZKeyLesson.vue'
import NKeyLesson from '../views/lessons/BottomRow/NKeyLesson.vue'
import MKeyLesson from '../views/lessons/BottomRow/MKeyLesson.vue'
import CommaKeyLesson from '../views/lessons/BottomRow/CommaKeyLesson.vue'
import PeriodKeyLesson from '../views/lessons/BottomRow/PeriodKeyLesson.vue'
import FSlashKeyLesson from '../views/lessons/BottomRow/FSlashKeyLesson.vue'
import VBKeyLesson from '../views/lessons/BottomRow/VBKeyLesson.vue'
import VBNKeyLesson from '../views/lessons/BottomRow/VBNKeyLesson.vue'
import BRwordLesson from '../views/lessons/BottomRow/BRwordLesson.vue'



import HomeRowTest from '../views/tests/HomeRow/HomeRowTest.vue'
import RandomTest from '../views/tests/RandomTest.vue'
import TopRowTest from '../views/tests/TopRow/TopRowTest.vue'
import BottomRowTest from '../views/tests/BottomRow/BottomRowTest.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tests/HomeRowTest',
    name: 'HomeRowTest',
    component: HomeRowTest
  },
  {
    path: '/tests/TopRowTest',
    name: 'TopRowTest',
    component: TopRowTest
  },
  {
    path: '/tests/RandomTest',
    name: 'RandomTest',
    component: RandomTest
  },
  {
    path: '/tests/BottomRowTest',
    name: 'BottomRowTest',
    component: BottomRowTest
  },
  {
    path: '/lessons/FKeyLesson',
    name: 'FKeyLesson',
    component: FKeyLesson
  },
  {
    path: '/lessons/DKeyLesson',
    name: 'DKeyLesson',
    component: DKeyLesson
  },
  {
    path: '/lessons/SKeyLesson',
    name: 'SKeyLesson',
    component: SKeyLesson
  },
  {
    path: '/lessons/AKeyLesson',
    name: 'AKeyLesson',
    component: AKeyLesson
  },
  {
    path: '/lessons/SemicolonKeyLesson',
    name: 'SemicolonKeyLesson',
    component: SemicolonKeyLesson
  },
  {
    path: '/lessons/LKeyLesson',
    name: 'LKeyLesson',
    component: LKeyLesson
  },
  {
    path: '/lessons/JKeyLesson',
    name: 'JKeyLesson',
    component: JKeyLesson
  },
  {
    path: '/lessons/KKeyLesson',
    name: 'KKeyLesson',
    component: KKeyLesson
  },
  {
    path: '/lessons/GKeyLesson',
    name: 'GKeyLesson',
    component: GKeyLesson
  },
  {
    path: '/lessons/GHKeyLesson',
    name: 'GHKeyLesson',
    component: GHKeyLesson
  },
  {
    path: '/lessons/GHJKeyLesson',
    name: 'GHJKeyLesson',
    component: GHJKeyLesson
  },
  {
    path: '/lessons/HKeyLesson',
    name: 'HKeyLesson',
    component: HKeyLesson
  },
  {
    path: '/lessons/HomeKeyLesson',
    name: 'HomeKeyLesson',
    component: HomeKeyLesson
  },
  {
    path: '/lessons/HRwordLesson',
    name: 'HRwordLesson',
    component: HRwordLesson
  },
  {
    path: '/lessons/TKeyLesson',
    name: 'TKeyLesson',
    component: TKeyLesson
  },
  {
    path: '/lessons/RKeyLesson',
    name: 'RKeyLesson',
    component: RKeyLesson
  },
  {
    path: '/lessons/EKeyLesson',
    name: 'EKeyLesson',
    component: EKeyLesson
  },
  {
    path: '/lessons/WKeyLesson',
    name: 'WKeyLesson',
    component: WKeyLesson
  },
  {
    path: '/lessons/QKeyLesson',
    name: 'QKeyLesson',
    component: QKeyLesson
  },
  {
    path: '/lessons/QKeyLesson',
    name: 'QKeyLesson',
    component: QKeyLesson
  },
  {
    path: '/lessons/PKeyLesson',
    name: 'PKeyLesson',
    component: PKeyLesson
  },
  {
    path: '/lessons/OKeyLesson',
    name: 'OKeyLesson',
    component: OKeyLesson
  },
  {
    path: '/lessons/IKeyLesson',
    name: 'IKeyLesson',
    component: IKeyLesson
  },
  {
    path: '/lessons/UKeyLesson',
    name: 'UKeyLesson',
    component: UKeyLesson
  },
  {
    path: '/lessons/YKeyLesson',
    name: 'YKeyLesson',
    component: YKeyLesson
  },
  {
    path: '/lessons/TYKeyLesson',
    name: 'TYKeyLesson',
    component: TYKeyLesson
  },
  {
    path: '/lessons/TYUKeyLesson',
    name: 'TYUKeyLesson',
    component: TYUKeyLesson
  },
  {
    path: '/lessons/TopKeyLesson',
    name: 'TopKeyLesson',
    component: TopKeyLesson
  },
  {
    path: '/lessons/TRwordLesson',
    name: 'TRwordLesson',
    component: TRwordLesson
  },
  {
    path: '/lessons/BKeyLesson',
    name: 'BKeyLesson',
    component: BKeyLesson
  },
  {
    path: '/lessons/VKeyLesson',
    name: 'VKeyLesson',
    component: VKeyLesson
  },
  {
    path: '/lessons/CKeyLesson',
    name: 'CKeyLesson',
    component: CKeyLesson
  },
  {
    path: '/lessons/XKeyLesson',
    name: 'XKeyLesson',
    component: XKeyLesson
  },
  {
    path: '/lessons/ZKeyLesson',
    name: 'ZKeyLesson',
    component: ZKeyLesson
  },
  {
    path: '/lessons/NKeyLesson',
    name: 'NKeyLesson',
    component: NKeyLesson
  },
  {
    path: '/lessons/MKeyLesson',
    name: 'MKeyLesson',
    component: MKeyLesson
  },
  {
    path: '/lessons/CommaKeyLesson',
    name: 'CommaKeyLesson',
    component: CommaKeyLesson
  },
  {
    path: '/lessons/PeriodKeyLesson',
    name: 'PeriodKeyLesson',
    component: PeriodKeyLesson
  },
  {
    path: '/lessons/FSlashKeyLesson',
    name: 'FSlashKeyLesson',
    component: FSlashKeyLesson
  },
  {
    path: '/lessons/VBKeyLesson',
    name: 'VBKeyLesson',
    component: VBKeyLesson
  },
  {
    path: '/lessons/VBNKeyLesson',
    name: 'VBNKeyLesson',
    component: VBNKeyLesson
  },
  {
    path: '/lessons/BRwordLesson',
    name: 'BRwordLesson',
    component: BRwordLesson
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router 