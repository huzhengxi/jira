/**
 * Created by jason on 2022/3/19.
 */
import {Simulate} from 'react-dom/test-utils';
import contextMenu = Simulate.contextMenu;

export interface ToDo {
  title: string,
  description: string
  complete: boolean
  createAt: number
}

const a = ['jack', 12, {gender: 'male'}] as const
const  str = ['12'] as const
