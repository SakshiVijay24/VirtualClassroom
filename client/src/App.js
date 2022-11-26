import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Subject from "./pages/SubjectPage";
import CreateSubject from "./pages/CreateSubject";
import CreateTask from "./pages/CreateTask";
import PageNotFound from "./pages/PageNotFound";
import AssignmentStudent from "./pages/student/AssignmentPage";
import AssignmentTeacher from "./pages/teacher/AssignmentPage"
import TestTeacher from "./pages/teacher/TestPage";
import TestStudent from "./pages/student/TestPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
          <Route exact path = "/" component = {Login} />
          <Route exact path = "/register" component = {Register} />
          <Route exact path = "/home" component = {Home}/>
          <Route exact path = "/new" component = {CreateSubject} />
          <Route exact path = "/create/:type/:subjectId" component = {CreateTask} />
          <Route exact path = "/subject/:id" component = {Subject}/>
          <Route exact path = "/Assignment/Student/:id" component = {AssignmentStudent} />
          <Route exact path = "/Test/Student/:id" component = {TestStudent} />
          <Route exact path = "/Assignment/Teacher/:id" component = {AssignmentTeacher} />
          <Route exact path = "/Test/Teacher/:id" component = {TestTeacher} />
          <Route path = "*" component = {PageNotFound} />
      </Switch>
  </Router>
  );
}

export default App;