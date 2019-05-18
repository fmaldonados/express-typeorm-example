import app from './app'
import { post as createPost, put as updatePost, remove as deletePost, getOne as getPost, getAll as getPosts } from "./controllers/post";
import { post as createCategory, put as updateCategory, remove as deleteCategory, getOne as getCategory, getAll as getCategories } from "./controllers/category";
import { post as createUser, put as updateUser, remove as deleteUser, getOne as getUser, getAll as getUsers, login } from "./controllers/user";
import { ensureAuth } from "./helpers/authorize";
app.get('/', (req, res) => {
    res.send({
        "liu": "Laureate International Universities"
    })
});

app.post('/category',ensureAuth,createCategory);
app.get('/category',ensureAuth, getCategories);
app.get('/category/:id',ensureAuth, getCategory);
app.put('/category/:id', ensureAuth,updateCategory);
app.delete('/category/:id', ensureAuth,deleteCategory);

app.post('/post',ensureAuth, createPost);
app.get('/post', ensureAuth, getPosts);
app.get('/post/:id',ensureAuth, getPost);
app.put('/post/:id', ensureAuth, updatePost);
app.delete('/post/:id', ensureAuth, deletePost);

app.post('/user',ensureAuth,createUser);
app.get('/user', ensureAuth,getUsers);
app.get('/user/:id', ensureAuth, getUser);
app.put('/user/:id', ensureAuth, updateUser);
app.delete('/user/:id', ensureAuth, deleteUser);

app.post('/login', login);

