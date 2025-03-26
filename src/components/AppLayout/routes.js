// Routes for Sidebar componentimport

export const routes = {
  homepage: { path: '/', icon: 'house', label: 'Homepage' },
  vehicle: { path: '/vehicle', icon: 'car', label: 'Vehicle' },
  rates: {path: '/rates', icon: 'file-contract', label: 'Rates'},
  dashboard: { path: '/dashboard', icon: 'file-contract', label: 'Dashboard' },
  simulation: {path: '/simulation', icon: 'file-contract', label: 'Simulation'},
  postsim: {path: '/postsim', icon: 'file-contract', label: 'PostSim'}
}

export const getTitle = pathname => {
  const key = pathname.replace('/', '')
  return key === '' ? routes.homepage.label : routes[key].label
}
