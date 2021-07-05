import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import CountryDetail from './components/Country/CountryDetail'

// Preferences
const GLOBAL_PREFERENCES_QUERY_PARAM = '?preferences=/'

export default function Routes() {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <Route path="/dashboard" component={Dashboard} />
      <Route exact path="/countries/:id" component={CountryDetail} />
      <Redirect to="/dashboard" />
    </Switch>
  )
}

export function getPreferencesSearch(screen) {
  return `${GLOBAL_PREFERENCES_QUERY_PARAM}${screen}`
}
