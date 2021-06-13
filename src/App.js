import { Switch, Route } from 'react-router-dom';

import AppHeader from "./components/Header";
import UsersPage from "./pages/Users";
import HomePage from "./pages/HomePage";
import UserPostsPage from "./pages/UserPosts";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TestPage from "./pages/TestPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
    return (
        <>
            <AppHeader />
            <Switch>
                <Route path="/users/:id/posts" component={UserPostsPage} />
                <Route path="/users" component={UsersPage} />
                <Route path="/test" component={TestPage} />
                <Route path="/" exact component={HomePage} />
                <Route path="*" component={NotFoundPage} />
            </Switch>
        </>
    )
}

export default App;
