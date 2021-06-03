import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'

// Preferences
const GLOBAL_PREFERENCES_QUERY_PARAM = '?preferences=/'

// <Route exact path="/tasks" component={Tasks} />
// <Route exact path="/disputes" component={Disputes} />
// <Route exact path="/disputes/:id" component={DisputeDetail} />

export default function Routes() {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <Route path="/dashboard" component={Dashboard} />

      <Redirect to="/dashboard" />
    </Switch>
  )
}

export function getPreferencesSearch(screen) {
  return `${GLOBAL_PREFERENCES_QUERY_PARAM}${screen}`
}
