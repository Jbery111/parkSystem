<template>
  <div id="audit-changes">
    审核修改
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'AuditChanges',
  created() {
    console.log(this, 'mmmmmmm')
  },
  beforeRouteUpdate(to, from, next) {
    console.log(this, '5555555555555555555555555555555555')
    next()
  }

}
</script>
