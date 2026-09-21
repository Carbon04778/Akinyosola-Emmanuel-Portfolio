# Platform logos

The four marks used in the 3D orbit and the list beside it.

| File | Mark |
|---|---|
| `claude-code.webp` | Claude starburst |
| `lovable.webp` | Lovable heart |
| `base44.webp` | Base44 sun |
| `replit.webp` | Replit blocks |

## Replacing a logo

Keep the same filename. The ideal file is:
- **256 × 256 px** WebP (or PNG) with a **fully transparent background**
- mark centred, filling ~70% of the frame
- under ~20 KB — these are loaded twice (list + 3D texture), so keep them small.
  Convert at squoosh.app → WebP, quality ~80.

Drop it in, overwrite the old file, done. Used in three places automatically:
the 3D orbit, the reduced-motion CSS orbit, and the list beside the orbit.

Third-party trademarks, used descriptively. Don't restyle or imply endorsement.
