export type Project = {
  id: string
  title: string
  description?: string
  category: string
  completion: number
  updated: string
  thumb?: string
  screenshot?: string
  launchUrl: string
  repoUrl: string
}

import miningImg from '../assets/projects/MiningTycoon.png'
import bioImg from '../assets/projects/BioSim.png'
import wtiiImg from '../assets/projects/WhatTimeIsIt.png'

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Mining Corporation Tycoon',
    description: 'Mining Corporation Tycoon is a retro‑flavored browser sim where you turn a gritty mine into a thriving operation through smart staffing, safety, and upgrades. Start each day with a fax‑style Morning Brief, then assign crews and tools to depth‑gated veins while balancing wages, morale, and risk. A probabilistic shift engine models production and hazards, and a Warehouse hub offers upgrade trees: Infrastructure (depth, electricity, ventilation, pumps, lighting), Tools, Storage, Health & Safety, and Business Intelligence. Depth unlocks new minerals, BI sharpens market timing, and post‑shift reports guide your next moves.',
    category: 'Game',
    completion: 60,
    updated: '2025-09-01',
    thumb: miningImg,
    screenshot: miningImg,
    launchUrl: 'https://mining-corporation-simulator.vercel.app',
    repoUrl: 'https://github.com/kromo/voxel-garden',
  },
  {
    id: 'p2',
    title: 'BioSim',
    description: 'A simulation that simulates the balance between bacterial growth and food availability.',
    category: 'Simulation',
    completion: 80,
    updated: '2025-08-20',
    thumb: bioImg,
    screenshot: bioImg,
    launchUrl: 'https://bio-chi-drab.vercel.app',
    repoUrl: 'https://github.com/kromo/flowboard',
  },
  {
    id: 'p3',
    title: 'What time is it?',
    description: 'A clock displaying work related times.',
    category: 'Clock',
    completion: 100,
    updated: '2025-07-14',
    thumb: wtiiImg,
    screenshot: wtiiImg,
    launchUrl: 'https://example.com/synthbits',
    repoUrl: 'https://github.com/kromo/synthbits',
  },

]


