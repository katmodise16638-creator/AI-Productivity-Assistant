# AI Build Schedule

Build a modern, responsive web application called AI Weekly Scheduler.

This is an MVP for a construction project management tool designed to help Project Managers generate and manage a weekly construction schedule using AI.

Focus on creating a polished, functional prototype with a small number of high-value features. Do not build unnecessary pages, complex integrations, authentication, APIs, notifications or database functionality at this stage.

Main Goal

The main user journey should be simple:

The Project Manager enters information about the current construction project.

The AI generates a suggested weekly schedule.

The Project Manager can review and edit the schedule.

The schedule can be viewed in a simple Gantt-style timeline.

The Project Manager can track task progress.

The user can ask the AI Project Assistant questions about the schedule.

1. Dashboard

Create a modern dashboard as the main landing page.

Include summary cards showing:

Weekly progress percentage

Total tasks

Completed tasks

Tasks at risk

Below the summary cards, display:

This Week's Tasks

Show the most important construction activities for the current week.

Include sample tasks such as:

Site survey

Excavation

Compaction

Formwork

Reinforcement installation

Engineer inspection

Concrete pour

Also include a small section called:

AI Insight

Display one useful AI-generated project insight.

Example:

The foundation inspection must be completed before the concrete pour. This activity should be prioritised to avoid delays.

2. AI Weekly Task Planner

This is the most important feature of the application.

Create a page called:

AI Task Planner

Allow the Project Manager to enter:

Project name

Current construction phase

Week starting date

Available team

Priority

Project constraints

Include a large text area called:

Describe the current project activities and constraints

Example placeholder:

Excavation is 70% complete. The foundation inspection must be completed before concrete can be poured. Steel reinforcement will arrive on Wednesday. The concrete crew is available Thursday and Friday.

Include a button:

Generate Weekly Plan

For the MVP, create a simulated AI-generated result using realistic construction activities.

The generated schedule should display:

TaskDayTeamPriorityStatus

Example:

| Complete excavation | Monday | Earthworks Team | High | In Progress |
| Install formwork | Tuesday | Concrete Team | Medium | Not Started |
| Reinforcement installation | Wednesday | Steel Team | High | Not Started |
| Engineer inspection | Thursday | Engineer | High | Not Started |
| Concrete pour | Friday | Concrete Team | High | Not Started |

The generated tasks must be editable.

Allow users to:

Edit task name

Change the day

Change priority

Change status

Add a new task

Delete a task

Mark a task as completed

Regenerate the schedule

Use local state and mock data. Do not require a real AI API for the first version.

3. Weekly Gantt Chart

Create a simple page or section called:

Weekly Schedule

Display the generated tasks in a clean Gantt-style weekly timeline.

Display:

Tasks on the left

Monday to Sunday across the top

A visual bar showing when each activity is scheduled

Keep the Gantt chart simple.

Use status colours or indicators for:

Not Started

In Progress

Completed

At Risk

When a task is edited, the Gantt chart should update.

Do not build advanced dependency lines or complex drag-and-drop functionality in this MVP.

4. Progress Tracker

Create a simple progress tracking section.

Display:

Overall weekly progress

Completed tasks

Tasks in progress

Tasks not started

Use:

Progress bars

Percentage indicators

Simple charts if appropriate

Allow the Project Manager to update a task's status.

Automatically update the overall weekly progress when tasks are marked as completed.

Example:

Earthworks — 80%

Foundation Works — 50%

Concrete Works — 20%

5. AI Project Assistant

Create a simple AI chat interface called:

AI Project Assistant

The assistant should help the Project Manager understand and manage the weekly schedule.

Include suggested questions:

What are my highest priority tasks?

Which tasks are at risk?

What should I complete before the concrete pour?

Summarise this week's schedule.

For the MVP, the chatbot can use simulated responses based on the existing schedule data.

Example response:

The highest priority activity is the foundation inspection because the concrete pour depends on it. Ensure the inspection is completed before Friday.

Keep the chatbot interface simple and professional.

Do not integrate an external AI API unless it can be done without significantly increasing the complexity of the project.

6. Navigation

Create a clean sidebar with only these pages:

Dashboard

AI Task Planner

Weekly Schedule

Progress Tracker

AI Project Assistant

Do not add unnecessary navigation items.

7. Sample Project

Use realistic mock data for a project called:

Riverside Commercial Development

Project type:

Commercial Construction Project

Use realistic sample activities:

Site survey

Excavation

Compaction

Foundation preparation

Formwork

Reinforcement installation

Engineer inspection

Concrete pour

Use realistic construction teams:

Site Team

Earthworks Team

Concrete Team

Steel Team

Engineer

8. Responsible AI Notice

Display this disclaimer in the AI Task Planner and AI Project Assistant:

Responsible AI Notice: AI-generated schedules and recommendations are planning suggestions only. They must be reviewed by the responsible Project Manager and relevant qualified professionals. The system does not replace engineering judgement, approved project documentation, safety procedures or construction regulations.

9. Design Requirements

The application should look like a modern professional SaaS product.

Use:

Dark sidebar

Light main background

White cards

Blue or purple accent colours

Rounded corners

Subtle shadows

Clean typography

Professional icons

Responsive design

The application must work well on:

Desktop

Tablet

Mobile

Keep the interface clean and avoid overcrowding the dashboard.

10. Technical Requirements

Build this as a functional interactive MVP.

Use:

Component-based architecture

Responsive design

Local state management

Editable task data

Mock AI-generated responses

Mock project data

Do not implement yet:

User authentication

Database

External APIs

Weather integration

Email notifications

WhatsApp integration

Multi-project support

Complex resource management

Advanced risk analysis

Schedule simulation

Structure the code so these features can be added later.

Final Goal

The final product should demonstrate one clear idea:

An AI-powered assistant that helps a Construction Project Manager quickly create, edit and manage a weekly construction schedule.

Prioritise a polished user interface and smooth user experience over building too many features.

Make the application feel like a real product prototype that could later grow into a complete AI-powered construction project management platform.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://weekly-build-ai.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/17aad916-bdfa-4ab8-ab0a-230466d6b209).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
