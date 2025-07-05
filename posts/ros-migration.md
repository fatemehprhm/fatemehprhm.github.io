# Migrating from ROS1 to ROS2: A Practical Guide

So, we finally did it. We migrated one of our larger robotics projects from ROS1 (Noetic, specifically) to ROS2 Humble. And let me tell you—it wasn’t just a “git checkout” and a coffee kind of job. It was more like untangling a drawer full of old charger cables. But we came out the other side with a faster, cleaner, more robust system.

In this post, I’ll walk you through what worked, what didn’t, and what I wish someone had told me before we started.


## Why Migrate At All?

Let’s be real: if you’re deep into ROS1 and your system works, the thought of migrating probably sounds painful. But ROS1 is aging. No real-time support, brittle comms, single-threaded bottlenecks… and it’s heading toward end-of-life. We needed better performance, more flexibility, and a future-proof system.

And ROS2 checked a lot of those boxes—once we got past the migration wall.


## What We Started With

We had a pretty complex setup in Noetic:
- Multiple nodes doing perception, planning, and control
- Custom messages
- Lots of `rosbag` recording and replay
- tf (a LOT of tf)

Pretty standard for a mid ROS1 project. But this made the porting trickier—because nothing was small, and everything was connected.


## The Migration Process (a.k.a. The Adventure)

### 1. Audit First

Before we wrote a single line of ROS2 code, we did a full inventory:
- What nodes were running?
- Which ones used services vs topics?
- Any weird dependencies? (looking at you, `rosserial`)
- How much relied on `rospy`, and how much was `roscpp`?

This helped us plan the porting order and spot anything that might break.

### 2. Drop the Dead Weight

ROS2 forced us to clean house a bit. Some scripts that were duct-taped together in ROS1 got rethought or removed entirely. Honestly, it felt great.

Pro tip: don’t just *port*. Refactor. You’ll thank yourself later.

### 3. Rewrite, Don’t Convert

We tried a few automated ROS1-to-ROS2 conversion tools. Meh. Most of the time it was faster to rewrite with ROS2 APIs than to debug broken bridges.

Especially with `rclcpp`, which has more robust node lifecycles, parameter handling, and multi-threading built in. We restructured some nodes around those new paradigms—and suddenly things were running smoother.


## Gotchas We Hit

### tf vs tf2

Everyone says "tf2 is mostly the same." It’s not. tf2 is stricter, and some of our tf broadcasting logic needed serious updates. Especially around buffering and static transforms. Expect bugs here.

### Launch Files

ROS2 uses Python launch files. Way more flexible, but also… different. Took us a while to stop trying to "translate" `.launch` XML and just embrace the Pythonic way.

### Dependencies & Package Builds

Migrating meant switching to `ament_cmake` and `colcon`. Not bad, but some of our old packages didn’t play nice right away. If you’ve got any third-party packages, check for ROS2 forks early.


## What Got Better

Here’s the fun part: things genuinely improved.

### Performance

- Latency dropped, especially with real-time sensor feeds.
- Nodes could finally run multi-threaded without hacking.
- DDS middleware handled message traffic far more efficiently.

### Modularity

- Composable nodes = less overhead and better startup times.
- Lifecycle nodes gave us cleaner state transitions and better control over initialization.
- Parameters felt like real config management, not just a side note.

### Tooling

- `ros2 topic echo`, `ros2 interface`, and the CLI in general? Massive upgrade.
- Better introspection. Easier debugging.
- No more need for `roscore`. It just works.


## What We’d Do Differently

- **Start with a clean ROS2 skeleton** and port features into it. Trying to shove ROS1-style design into ROS2 APIs doesn’t feel right.
- **Test with actual hardware early.** Simulation isn’t always enough to catch timing bugs.
- **Write wrappers for bridging during transition.** That let us run ROS1 and ROS2 nodes together while migrating piece by piece.


## Is It Worth It?

Short answer: yes. Long answer: yes, but only if you’re ready to commit.

The move to ROS2 isn’t just an upgrade. It’s a shift in mindset. You get more power, more performance, and a more maintainable system—but you have to invest the time to do it properly.

If your project is growing, or you care about long-term support, or you’ve ever cursed the limitations of ROS1... it’s time.


## Final Thoughts

Migrating from ROS1 to ROS2 isn’t painless, but it’s absolutely doable—and honestly kind of refreshing once you get over the hump. Our robots run smoother. Our code is cleaner. Our team sleeps a little better.

So if you’re thinking about taking the leap, do it. Plan it out. Take your time. Don’t panic when the first launch file explodes.

You’ll get there.

And once you do? You’ll wonder why you waited so long.
