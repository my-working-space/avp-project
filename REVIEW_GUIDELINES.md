# Review Guidelines & Thought Process

This document explains how reviews should be approached for this repository and includes a short "thought process" template reviewers can follow.

## Why use PRs as a solo developer
- Provides a focused place to inspect changes before merging.  
- Keeps a clean audit trail (PR number) for changelogs and issue linking.  
- Enables CI checks and easy rollbacks.

## Minimal review checklist
1. Tests: New behavior is exercised, and existing tests still pass.  
2. CI: Build and test checks are green.  
3. Security: No secrets, no eval-like usage, safe dependency changes.  
4. Correctness: Logic is correct and reasonable.  
5. Documentation: Update README or docs if user-facing changes occurred.  

## Reviewer's thought process (short template)
When reviewing, run through these questions and add short notes to the PR:
- What is the intent of this change? (1 sentence)  
- Does the implementation match the intent? (yes/no + note)  
- Are edge cases covered by tests? (yes/no + note)  
- Are there any security or performance concerns? (brief note)  

Use this file as a reference and copy the "Reviewer: Reviewer's thought process" section into PRs when you want to capture a detailed rationale.
