<template>
    <thead>
        <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
    </thead>
</template>

<script>
export default {
    props: {
        headers: Array,
    },
};
</script>
