<template>
    <div class="col-7 col-sm-3 d-flex justify-content-evenly align-items-center">
    <router-link to="/login">
        <button  class="btn text-light ms-1" style="background-color: #009C9E;">Login</button>
    </router-link>
    <router-link to="/signup">
        <button  class="btn text-light ms-1" style="background-color: #009C9E;">SignUp</button>
    </router-link>
        <span class="mx-2" style="color: #999; font-weight: bold;">|</span>
        <select class="form-select form-select-sm border-0" style="width: auto;">
            <option value="en" selected>EN</option>
            <option value="id">ID</option>
            <option value="fr">FR</option>
            <option value="de">DE</option>
        </select>
    </div>
</template>