<template>
    <div class="container">
        <h1>Page Not Found</h1>
        <p>The requested path "{{ $route.fullPath }}" was not found.</p>
        <router-link to="/">
            <button class="button-error">Return to Home</button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'NotFoundView'
}
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
.button-error {
    background-color: #f44336;
    border: none;
    border-radius: 15px;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
}
.button-error:hover {
    border-color: #75bef8;
    background-color: #2196F3;
    color: white;
}

</style>