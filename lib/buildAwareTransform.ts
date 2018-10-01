/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    ExtensionPack,
    GitHubIssueRouter,
    IssueCreationOptions,
    metadata,
} from "@atomist/sdm";
import { buildAwareBuildListener } from "./support/build-aware/buildAwareBuildListener";

/**
 * Extension pack to add "build aware" code transform support, where
 * a branch is quietly created in the first instance,
 * and an issue or PR is created in response to build status.
 * It's necessary to add this pack
 * to have dry run editorCommand function respond to builds.
 */
export function buildAwareCodeTransforms(opts: Partial<IssueCreationOptions> = {}): ExtensionPack {
    const optsToUse: IssueCreationOptions = {
        issueRouter: new GitHubIssueRouter(),
        ...opts,
    };

    return {
        ...metadata("build-aware-code-transforms"),
        configure: sdm => {
            sdm.addBuildListener(buildAwareBuildListener(optsToUse));
        },
    };
}
