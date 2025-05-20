<template>

  <!--<RouterLink :to="'/petsbreedslist/' + id" class="p-name">{{ name }}</RouterLink> -->
  <tr v-if='!edit_mode'>

    <td>{{ name_complication }}</td>

    <td>
      <div class="button-group">

        <button type="but" title="Редактировать" @click="onEdit" class="edit-button">
          <img alt="Редактировать" class="logo" src="@/assets/free-icon-pencil-650143.png" width="20" height="20" />
        </button>

        <button type="but" title="Удалить" @click="onDelete" class="delete-button">
          <img alt="Удалить" class="logo" src="@/assets/free-icon-delete-1214428.png" width="20" height="20" />
        </button>

      </div>
    </td>
  </tr>

  <ComplicationCCEditForm v-else :id='this.id' :name_complication="this.name_complication" :complication="complication"
    :note="this.note" @edit_item="edit_item" @cancel_edit="cancel_edit" />
</template>


<script>
import ComplicationCCEditForm from './ComplicationCCEditForm.vue';
export default {
  components: {
    ComplicationCCEditForm
  },
  props: {
    id: {
      type: Number,
      required: true,
    },

    name_clinical_case: {
      type: String,

    },
    name_complication: {
      type: String,

    },


    complication: {
      type: [Number],
      required: true
    },
  },
  data() {
    return {
      edit_mode: false
    }
  },
  methods: {
    onEdit() {
      this.edit_mode = true;
    },
    edit_item(id, name_clinical_case, complication) {
      this.$emit("edit_item", id, name_clinical_case, complication);
      this.edit_mode = false;
    },
    cancel_edit() {
      this.edit_mode = false;
    },
    onDelete() {
      this.$emit('delete_item', this.id);
    }
  }
};
</script>

<style>
.highlight-link {
  color: #007BFF;
  font-weight: 600;
  text-decoration: none;
  padding: 2px 6px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.highlight-link:hover {
  background-color: #007BFF;
  color: white;
  text-decoration: none;
  cursor: pointer;
}
</style>
