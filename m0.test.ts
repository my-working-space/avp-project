import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

/**
 * Milestone 0 Verification Tests
 * Confirms all setup tasks are complete
 */

describe('M0: Setup & Boilerplate Verification', () => {
    const rootDir = process.cwd();

    describe('Git Setup', () => {
        it('should have git repository initialized', () => {
            const gitDir = path.join(rootDir, '.git');
            expect(fs.existsSync(gitDir)).toBe(true);
        });

        it('should have .gitignore file', () => {
            const gitignore = path.join(rootDir, '.gitignore');
            expect(fs.existsSync(gitignore)).toBe(true);
        });
    });

    describe('Folder Structure', () => {
        const requiredFolders = [
            'apps/creator/src',
            'apps/creator/public',
            'packages/player/src',
            'server/src',
            'server/src/routes',
            'server/src/providers/tts',
            'shared/types',
            'shared/utils',
            '.github/workflows',
        ];

        requiredFolders.forEach((folder) => {
            it(`should have ${folder} directory`, () => {
                const folderPath = path.join(rootDir, folder);
                expect(fs.existsSync(folderPath)).toBe(true);
            });
        });
    });

    describe('Configuration Files', () => {
        const requiredFiles = {
            root: [
                'package.json',
                'tsconfig.base.json',
                '.eslintrc.json',
                '.prettierrc.json',
                '.env.example',
                'README.md',
                'vercel.json',
            ],
            creator: [
                'apps/creator/package.json',
                'apps/creator/tsconfig.json',
                'apps/creator/vite.config.ts',
                'apps/creator/tailwind.config.js',
                'apps/creator/postcss.config.js',
                'apps/creator/index.html',
            ],
            player: [
                'packages/player/package.json',
                'packages/player/tsconfig.json',
            ],
            server: [
                'server/package.json',
                'server/tsconfig.json',
            ],
            github: [
                '.github/workflows/ci.yml',
            ],
        };

        Object.entries(requiredFiles).forEach(([category, files]) => {
            describe(category, () => {
                files.forEach((file) => {
                    it(`should have ${file}`, () => {
                        const filePath = path.join(rootDir, file);
                        expect(fs.existsSync(filePath)).toBe(true);
                    });
                });
            });
        });
    });

    describe('Source Code Files', () => {
        const requiredSources = {
            creator: [
                'apps/creator/src/App.tsx',
                'apps/creator/src/main.tsx',
                'apps/creator/src/App.test.tsx',
                'apps/creator/src/index.css',
            ],
            player: [
                'packages/player/src/index.ts',
                'packages/player/src/types.ts',
                'packages/player/src/utils.ts',
                'packages/player/src/AVPPlayer.tsx',
                'packages/player/src/utils.test.ts',
            ],
            server: [
                'server/src/server.ts',
                'server/src/config.ts',
                'server/src/server.test.ts',
            ],
            shared: [
                'shared/types/providers.ts',
                'shared/utils/constants.ts',
            ],
        };

        Object.entries(requiredSources).forEach(([category, files]) => {
            describe(category, () => {
                files.forEach((file) => {
                    it(`should have ${file}`, () => {
                        const filePath = path.join(rootDir, file);
                        expect(fs.existsSync(filePath)).toBe(true);
                    });
                });
            });
        });
    });

    describe('package.json Structure', () => {
        it('root package.json should have workspaces', () => {
            const packageJson = JSON.parse(
                fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8')
            );
            expect(packageJson.workspaces).toBeDefined();
            expect(packageJson.workspaces).toContain('apps/*');
            expect(packageJson.workspaces).toContain('packages/*');
        });

        it('root package.json should have required scripts', () => {
            const packageJson = JSON.parse(
                fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8')
            );
            expect(packageJson.scripts.dev).toBeDefined();
            expect(packageJson.scripts.build).toBeDefined();
            expect(packageJson.scripts.test).toBeDefined();
            expect(packageJson.scripts['type-check']).toBeDefined();
        });

        it('creator package.json should have correct name', () => {
            const packageJson = JSON.parse(
                fs.readFileSync(path.join(rootDir, 'apps/creator/package.json'), 'utf-8')
            );
            expect(packageJson.name).toBe('@avp/creator');
        });

        it('player package.json should have correct name', () => {
            const packageJson = JSON.parse(
                fs.readFileSync(path.join(rootDir, 'packages/player/package.json'), 'utf-8')
            );
            expect(packageJson.name).toBe('@avp/player');
        });
    });

    describe('TypeScript Configuration', () => {
        it('tsconfig.base.json should have proper path mappings', () => {
            const tsconfig = JSON.parse(
                fs.readFileSync(path.join(rootDir, 'tsconfig.base.json'), 'utf-8')
            );
            expect(tsconfig.compilerOptions.paths).toBeDefined();
            expect(tsconfig.compilerOptions.paths['@avp/player']).toBeDefined();
        });

        it('creator tsconfig should extend base', () => {
            const tsconfig = JSON.parse(
                fs.readFileSync(path.join(rootDir, 'apps/creator/tsconfig.json'), 'utf-8')
            );
            expect(tsconfig.extends).toContain('tsconfig.base.json');
        });

        it('player tsconfig should extend base', () => {
            const tsconfig = JSON.parse(
                fs.readFileSync(path.join(rootDir, 'packages/player/tsconfig.json'), 'utf-8')
            );
            expect(tsconfig.extends).toContain('tsconfig.base.json');
        });

        it('server tsconfig should extend base', () => {
            const tsconfig = JSON.parse(
                fs.readFileSync(path.join(rootDir, 'server/tsconfig.json'), 'utf-8')
            );
            expect(tsconfig.extends).toContain('tsconfig.base.json');
        });
    });

    describe('App Content', () => {
        it('Creator App should render "AVP Creator" title', () => {
            const appContent = fs.readFileSync(path.join(rootDir, 'apps/creator/src/App.tsx'), 'utf-8');
            expect(appContent).toContain('AVP Creator');
        });

        it('Creator App should have Coming Soon message', () => {
            const appContent = fs.readFileSync(path.join(rootDir, 'apps/creator/src/App.tsx'), 'utf-8');
            expect(appContent).toContain('Coming Soon');
        });

        it('Creator App should have drag/drop zone stub', () => {
            const appContent = fs.readFileSync(path.join(rootDir, 'apps/creator/src/App.tsx'), 'utf-8');
            expect(appContent).toContain('Drag & drop');
        });

        it('Creator App should display feature previews', () => {
            const appContent = fs.readFileSync(path.join(rootDir, 'apps/creator/src/App.tsx'), 'utf-8');
            expect(appContent).toContain('Audio Generation');
            expect(appContent).toContain('Media Control');
            expect(appContent).toContain('Export');
        });
    });

    describe('Player Component', () => {
        it('should export AVPPlayer component', () => {
            const indexContent = fs.readFileSync(
                path.join(rootDir, 'packages/player/src/index.ts'),
                'utf-8'
            );
            expect(indexContent).toContain('export');
            expect(indexContent).toContain('AVPPlayer');
        });

        it('should have AVPPlayer.tsx file', () => {
            const playerFile = path.join(rootDir, 'packages/player/src/AVPPlayer.tsx');
            expect(fs.existsSync(playerFile)).toBe(true);
            const content = fs.readFileSync(playerFile, 'utf-8');
            expect(content).toContain('AVPPlayer');
        });

        it('should have manifest types defined', () => {
            const typesFile = path.join(rootDir, 'packages/player/src/types.ts');
            const content = fs.readFileSync(typesFile, 'utf-8');
            expect(content).toContain('Manifest');
            expect(content).toContain('Keyframe');
        });

        it('should have utilities for extracting AVP files', () => {
            const utilsFile = path.join(rootDir, 'packages/player/src/utils.ts');
            const content = fs.readFileSync(utilsFile, 'utf-8');
            expect(content).toContain('extractAVP');
        });
    });

    describe('Server Setup', () => {
        it('should have Express server configured', () => {
            const serverFile = path.join(rootDir, 'server/src/server.ts');
            const content = fs.readFileSync(serverFile, 'utf-8');
            expect(content).toContain('express');
            expect(content).toContain('/health');
        });

        it('should have config loading with dotenv', () => {
            const configFile = path.join(rootDir, 'server/src/config.ts');
            const content = fs.readFileSync(configFile, 'utf-8');
            expect(content).toContain('dotenv');
            expect(content).toContain('config');
        });

        it('should have TTS route stub', () => {
            const serverFile = path.join(rootDir, 'server/src/server.ts');
            const content = fs.readFileSync(serverFile, 'utf-8');
            expect(content).toContain('/api/tts');
        });
    });

    describe('Shared Code', () => {
        it('should have TTS provider interface', () => {
            const providersFile = path.join(rootDir, 'shared/types/providers.ts');
            const content = fs.readFileSync(providersFile, 'utf-8');
            expect(content).toContain('TTSProvider');
        });

        it('should have constants defined', () => {
            const constantsFile = path.join(rootDir, 'shared/utils/constants.ts');
            const content = fs.readFileSync(constantsFile, 'utf-8');
            expect(content).toContain('CONSTRAINTS');
            expect(content).toContain('MAX_FILE_SIZE_MB');
        });
    });

    describe('CI/CD Setup', () => {
        it('should have GitHub Actions workflow', () => {
            const workflowFile = path.join(rootDir, '.github/workflows/ci.yml');
            expect(fs.existsSync(workflowFile)).toBe(true);
        });

        it('CI workflow should run tests', () => {
            const workflowContent = fs.readFileSync(
                path.join(rootDir, '.github/workflows/ci.yml'),
                'utf-8'
            );
            expect(workflowContent).toContain('npm run test');
        });

        it('CI workflow should type-check', () => {
            const workflowContent = fs.readFileSync(
                path.join(rootDir, '.github/workflows/ci.yml'),
                'utf-8'
            );
            expect(workflowContent).toContain('npm run type-check');
        });

        it('should have Vercel config', () => {
            const vercelFile = path.join(rootDir, 'vercel.json');
            expect(fs.existsSync(vercelFile)).toBe(true);
        });
    });

    describe('Environment & Documentation', () => {
        it('should have .env.example file', () => {
            const envExample = path.join(rootDir, '.env.example');
            expect(fs.existsSync(envExample)).toBe(true);
        });

        it('should have comprehensive README', () => {
            const readmeFile = path.join(rootDir, 'README.md');
            const content = fs.readFileSync(readmeFile, 'utf-8');
            expect(content).toContain('AVP Tool');
            expect(content).toContain('Quick Start');
            expect(content).toContain('Milestones');
        });
    });
});
