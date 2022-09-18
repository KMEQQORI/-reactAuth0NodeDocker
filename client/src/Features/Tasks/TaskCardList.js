import React from "react";
import GridItem from "components/Grid/GridItem.js";
import TaskCard from "./TaskCard";

export default function TaskCardList({ category, fetchCategories }) {
  return category.tasks && category.tasks.length > 0 ? (
    category.tasks.map(task => (
      <GridItem xs={12} sm={12} md={12} key={task.id}>
        <TaskCard task={task} fetchCategories={fetchCategories} />
      </GridItem>
    ))
  ) : (
    <GridItem xs={12} sm={12} md={10}>
      please click on the header to add tasks to this step
    </GridItem>
  );
}
