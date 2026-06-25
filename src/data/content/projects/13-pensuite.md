---
name: PenSuite
shortName: pensuite 
shortDescription: CLI based WebSec tool.
date: 2026
tags: [Rust, Ratatui]
link: https://github.com/tobikli/pensuite
image: pensuite.png
status: ongoing
---

<p>
	A Rust based CLI tool using the <a class="underline" href=https://ratatui.rs/>Ratatui</a> framework.
</p>
<p class="mt-3">
	It allows users to input a <i>target</i> that is dynamically identified as URL, IP, Hostname or more. Modules can then be loaded to that use this target to perform a script, for example for testing a vulnerability. Modules can easily be added as PenSuite offers a easy structure where modules can directly access the target, render UI and request for additional user input.
</p>