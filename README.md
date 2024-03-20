# Slidar

A markdown presentation tool that keeps you informed.

<img src="https://github.com/kubgus/slidar/assets/53797257/f5d21684-e63e-4189-b3b2-84347efd08cf" alt="Demo" width="750"/>

# Features

- Slide progress bar
- Time progress bar
- Easy markdown slide creation
- Your own localhost server (control)

# Usage

Clone the repo and run:

```bash
npm install
npm start [path/to/presentation.md] [duration_in_minutes] [port]
```

# Presentation file

```md
# Slide 1

Content of slide 1

---

# Slide 2

Content of slide 2
```

# Navigation

- `Right Arrow` or `Space` to go to the next slide
- `Left Arrow` to go to the previous slide

# Special cases

If your presentation is accidentally closed, the time will reset.

You can modify the `seconds_passed` variable in the console to skip to a specific time.

# Contributing

I don't really care I made this in like 2 hours lol

(But if you want to contribute, feel free to open a PR)

---

Congratulations, you've reached the end of the README. You must be really bored.
